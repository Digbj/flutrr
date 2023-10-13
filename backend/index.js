// mongodb+srv://11223344:<password>@cluster0.pvuhypy.mongodb.net/?retryWrites=true&w=majority
const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
const user=require('./schema/user')

//Middle-ware
const app=express();
const salt=bcrypt.genSaltSync(10);
const secret='jhuhebfcueb78687sd7c7s6t76t6';

app.use(cors({credentials:true,origin:'http://localhost:3000'} ));
app.use(express.json());
//cookie parser is to make the cookies readable for the frontend use
app.use(cookieParser());




//db connection

mongoose.connect('mongodb+srv://11223344:11223344@cluster0.pvuhypy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.log("Error Connecting to MongoDB", error);
});



//registration api
app.post('/reg',async(req,res)=>{
    const {uname,uemail,upassword}=req.body;
    try{
        const existingUser=await user.findOne({email:uemail});
    
    if(existingUser){
        res.status(400).json("User already Exists");
    }else{
        const userDet=await user.create({
            name:uname,email:uemail,password:bcrypt.hashSync(upassword,salt),});
            res.json(userDet);
    }
    }catch(error){
        res.status(400).json(error);
    }
});


//Login
app.post('/login',async(req,res)=>{
    const{email,password}=req.body;
    try{
        const userDet=await user.findOne({email});

        if(!userDet){
            res.status(400).json('User not found');
            return;
        }

        const pass=bcrypt.compareSync(password,userDet.password);

        
      if (pass) {
        jwt.sign({name:userDet.name, email, id: userDet._id}, secret, {}, (error, token) => {
          if (error) throw error;
  
          // Set the cookie in the response header
          res.cookie('token', token).json({ message: 'Cookie set successfully',id:userDet._id,name:userDet.name });
        });
      } else {
        res.status(400).json('Wrong credentials');
      }
    } catch (error) {
      res.status(400).json(error);
    }
})


app.get('/profile',(req,res)=>{
    const{token}=req.cookies;
    if(!token){
        res.status(401).json({error:"unauthorised"});
        return;
    }
    jwt.verify(token,secret,{},(error,details)=>{
        if(error){
            //if the oken is invalid or expires
            res.status(401).json({error:'Invalid token'});
            return;
        }
        //Sending the user details as the response
        res.json(details);
    })
})

app.post('/logout',(req,res)=>{
    res.cookie('token','').json('Loged Out')
  })

app.listen(8000,()=>{
    console.log("app is listning at 8000")
})