import { useState } from "react";
const Login=()=>{
    const [toggle,setToggle]=useState(true)
    const [loginDet,setLoginDet]=useState({
         email:'',
         password:''
    })
    const [regDetails,setRegDetails]=useState({
        uname:'',
        uemail:'',
        upassword:'',
        ucpassword:'',
    })
    const [msg,setMsg]=useState("")
    
const LoginUser=()=>{
    console.log(loginDet)
    if(!loginDet.email||!loginDet.password){
        setMsg("Fill All The Credentials")
     }else{
        setMsg("")
     }
}
const Register=()=>{
    console.log(regDetails)
    if(!regDetails.uname||!regDetails.uemail||!regDetails.ucpassword||!regDetails.upassword){
        setMsg("Fill All The Credentials")
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(regDetails.uemail)) {
        setMsg("Invalid email address");
    }else if(regDetails.upassword!==regDetails.ucpassword){
        setMsg("Password Didnot Matched")
    }else{
        setMsg("")
        setToggle(true)
    }
}


    return(
        <>
        {
            toggle?<div className="container">
            <div className="cont">
            <h3>Login</h3>
            <div className="inp">
                <input placeholder="User ID" onChange={(e)=>{setLoginDet({...loginDet,email:e.target.value})}}/>
                <input type='password' placeholder="Password" onChange={(e)=>{setLoginDet({...loginDet,password:e.target.value})}}/>
            </div>
            <div><button onClick={LoginUser}>Login</button></div>
            <div><p>New User Register <span className="sp" onClick={()=>{setToggle(false)}}>Here</span></p></div>
            <div>{msg}</div>
            </div>
        </div>
        
        :
        
        <div className="container">
            <div className="cont">
            <h3>Registration</h3>
            <div className="inp">
                <input value={regDetails.uname} placeholder="User Name" onChange={(e)=>{setRegDetails({...regDetails,uname:e.target.value})}}/>
                <input value={regDetails.uemail} placeholder="Email Id" onChange={(e)=>{setRegDetails({...regDetails,uemail:e.target.value})}}/>
                <input type='password' placeholder="Password" onChange={(e)=>{setRegDetails({...regDetails,upassword:e.target.value})}}/>
                <input type='password' placeholder="Confirm-Password" onChange={(e)=>{setRegDetails({...regDetails,ucpassword:e.target.value})}}/>
            </div>
            <div><button onClick={Register}>Register</button></div>
            <div><p>Sign In <span className="sp" onClick={()=>{setToggle(true)}}>Here</span></p></div>
            <div>{msg}</div>
            </div>
        </div>
        }       
        </>
       
    )
}
export default Login;