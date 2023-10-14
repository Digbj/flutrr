import { useState,useContext } from "react";
import { Navigate ,Link} from "react-router-dom";
import { UserContext } from "../context/userContext";
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
    const [redirect,setRedirect]=useState(false)
    const {setInfo}=useContext(UserContext);
    
const LoginUser=async(e)=>{
    console.log(loginDet)
    if(!loginDet.email||!loginDet.password){
        setMsg("Fill All The Credentials")
     }else{
        setMsg("")
        try {
            const response = await fetch('https://bookapp-14vf.onrender.com/login', {
                method: 'POST',
                body: JSON.stringify({ email: loginDet.email, password: loginDet.password }),
                headers: { 'Content-type': 'application/json' },
                credentials: 'include',
            });

            if (response.status === 200) {
                const userInfo = await response.json();
                setInfo(userInfo);
                setRedirect(true);
            } else {
                setMsg('Wrong Credential');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}


const Register=async(e)=>{
    console.log(regDetails)
    if(!regDetails.uname||!regDetails.uemail||!regDetails.ucpassword||!regDetails.upassword){
        setMsg("Fill All The Credentials")
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(regDetails.uemail)) {
        setMsg("Invalid email address");
    }else if(regDetails.upassword!==regDetails.ucpassword){
        setMsg("Password Didnot Matched")
    }else{
        setMsg("")
        try {
            const response = await fetch('https://bookapp-14vf.onrender.com/reg', {
                method: 'POST',
                body: JSON.stringify({
                    name: regDetails.uname,
                    email: regDetails.uemail,
                    password: regDetails.upassword,
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status === 200) {
                setMsg("Registration Successful");
                setToggle(true);
            } else {
                setMsg('Registration Failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }
}

if(redirect){
    return <Navigate to='/books'/>
}

    return(
        <>
        {
            toggle?<div className="container">
            <div className="cont">
            <h3>Login</h3>
            <div className="inp">
                <input placeholder="Email ID" onChange={(e)=>{setLoginDet({...loginDet,email:e.target.value})}}/>
                <input type='password' placeholder="Password" onChange={(e)=>{setLoginDet({...loginDet,password:e.target.value})}}/>
            </div>
            <div><button onClick={LoginUser}>Login</button></div>
            <div><p>New User Register <span className="sp" onClick={()=>{setToggle(false)}}>Here</span></p></div>
            <div>{msg}</div>
            </div>
            <div><Link to='/books'><button>Login As Guest</button></Link></div>
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