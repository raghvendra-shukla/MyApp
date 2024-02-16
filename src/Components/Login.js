import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
    {document.body.style.backgroundColor="#b7acac"};
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({username:"",password:""})
  
    const handleonsubmit= async (e)=>{
        e.preventDefault();
        // https://dummyjson.com/auth/login
        // https://dummyjson.com/users
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({username:credentials.username,password:credentials.password})
          });
          const json= await response.json();
          // console.log(json);
          if(json.token){
            localStorage.setItem("token",json.token);
            navigate("/");
            props.showAlert("login successfull","success");
          }
          else{
            props.showAlert("Invalid Credentials","danger");
          }
    }
    const handleonchange=(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
  return (
    <div className="container">
        <h1 className='text-center my-2 font-bold text-3xl'>Login to continue</h1>
    <form onSubmit={handleonsubmit}>
        <div className="mb-3">
            <label htmlFor="exampleInputusername1" className="form-label font-bold">UserName address</label>
            <input type="username" className="form-control" id="username" aria-describedby="usernameHelp" onChange={handleonchange} name="username" placeholder='Enter your username'/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label font-bold">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleonchange} placeholder='Enter your password'/>
        </div>
        <div className='text-center d-grid gap-2 col-6 mx-auto mb-3'>
        <button type="submit" className="btn bg-black text-white mb-3">Login</button>
        </div>
    </form>
    </div>
  )
}

export default Login