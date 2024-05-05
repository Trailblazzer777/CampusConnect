import React from 'react'
import './SignUp.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

function SignUp() {
  const signup = async () => {
    let dataObj;
    await fetch('http://localhost:4001/signup', {
      method: 'POST',
      headers: {
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((data) => {dataObj=data});

      if (dataObj.success) {
        localStorage.setItem('auth-token',dataObj.token);
        window.location.replace("/");
      }
      else
      {
        alert(dataObj.errors)
      }
  }

   const [formData, setFormData] = useState({
      name:"",
      email:"",
      password:""
  })
   const  changeHandler = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
   }
  return (
    <div className='signup-page'>
        <div className="signup-container">
            <h2>Register</h2>
            <div className="signup-forms">
            <label >Name</label>
            <input name="name" onChange={changeHandler} placeholder='username'/>
            <label>Email</label>
            <input name="email" onChange={changeHandler} placeholder='username@gmail.com'/>
            <label>Password</label>
            <input name="password" onChange={changeHandler} placeholder='password' />
            </div>
            <button className="signup-button" onClick={()=>signup()}>Register</button>
            <p>Already an User? <Link to='/'>Login</Link></p>
        </div>
    </div>
  )
}

export default SignUp