import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'

function Login() {
  const login = async () => { 
    let dataObj;
    await fetch('http://localhost:4001/login', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});
      console.log(dataObj);
      if (dataObj.success) {
        localStorage.setItem('auth-token',dataObj.token);
        window.location.replace("/Home");
      }
      else
      {
        alert(dataObj.errors)
      }
  }

   const [formData, setFormData] = useState({
      name:"",
      password:"",
      email:""
  })
   const  changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
   }


  return (
    <div className='login-page'>
        <div className='login-page-container'>
            <h1>Login</h1>
            <div className='login-forms'>
                <input name='email' placeholder='Email' value={formData.email} onChange={changeHandler}></input>
                <input name='password' placeholder='Password' value={formData.password} onChange={changeHandler}></input>
            </div>
            <button className='login-button' onClick={()=>login()}>Login</button>
            <p>Haven't you registered yet? <Link to='/signup'><h5>Register</h5></Link></p>
        </div>
    </div>
  )
}

export default Login