import { useState } from "react";
const Login=()=>{
    const [toggle,setToggle]=useState(false)
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
    
const LoginUser=()=>{
    console.log(loginDet)
}
const Register=()=>{
    console.log(regDetails)
}

    return(
        <>
        {
            toggle?<div className="container">
            <div className="cont">
            <h3>Login</h3>
            <div className="inp">
                <input placeholder="User ID" onChange={(e)=>{setLoginDet({...loginDet,email:e.target.value})}}/>
                <input placeholder="Password" onChange={(e)=>{setLoginDet({...loginDet,password:e.target.value})}}/>
            </div>
            <div><button onClick={LoginUser}>Login</button></div>
            <div><p>New User Register <span onClick={()=>{setToggle(false)}}>Here</span></p></div>
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
            <div><p>New User Register <span onClick={()=>{setToggle(true)}}>Here</span></p></div>
            </div>
        </div>
        }       
        </>
       
    )
}
export default Login;