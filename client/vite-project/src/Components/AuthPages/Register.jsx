import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Register = () => {

  const navigate = useNavigate();
  const [formData,  setFormData] = useState({
    name:'',
    email:'',
    password:'',
  })

  const shiftlogin = async(e) =>{
    navigate('/signin');
  }
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const result = await response.json();
      if(result.success){
        alert('Sign up Successful')
        navigate('/verifyotp');
      }else {
        alert(`Error: ${result.message}`);
      }

    }
    catch (err) {
      alert('Login failed. Please try again.');
      console.error(err);}
  }
  const handleChange = async (e) =>{
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  }
  return (
    <div>
      <div className="container">
        <h1>Create Account</h1>
        <p>Enter Your Details</p>
        <form action="" onSubmit={handleSubmit}>
        <div className="name">
            <input name='name' type="text" placeholder='Name' value={formData.name} onChange={handleChange}/>
        </div>
        <div className="Email">
            <input name='email' type="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
        </div>
        <div className="Password">
            <input name='password' type="password" placeholder='Password' value={formData.password} onChange={handleChange}/>
        </div>
        
        <div className="signup-div">
            <button type='submit'>Sign up</button>
        </div>
        <div className="already-account">
            <p>Already Have a Account? <a href="" onClick={shiftlogin}>Sign In</a> instead</p>
            
        </div>

        </form>
      </div>
    </div>
  )
}

export default Register
