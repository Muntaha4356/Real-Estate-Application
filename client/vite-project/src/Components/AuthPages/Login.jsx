import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [formData,  setFormData] = useState({
    email:'',
    password:'',
  })

  const handleChange = (e) =>{
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const signupshift= async(e) =>{
    navigate('/signup');
  }
  const handleSubmit =async (e)=>{
    e.preventDefault();
    try{
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      const result = await response.json();
      if(result.success){
        alert('Login Successful')
        navigate('/');
      }else {
        alert(`Error: ${result.message}`);
      }

    }
    catch (err) {
      alert('Login failed. Please try again.');
      console.error(err);}
  }
  const forgotPassword=async(e)=>{
    navigate('/email-enter')
  }
  
  return (
    <div>
      <div className="container">
        <h1>Create Account</h1>
        <p>Enter Your Details</p>
        <form onSubmit={handleSubmit} action="">
        
        <div className="Email">
            <input name='email' type="email" placeholder='Email' value={formData.email} onChange={handleChange}/>
        </div>
        <div className="Password">
            <input name='password' type="password" placeholder='Password' value={formData.password}  onChange={handleChange}/>
        </div>
        <div className="forgetPassword">
            <a href="" onClick={forgotPassword}>Forgot Password?</a>
        </div>
        <div className="signup-div">
            <button type='submit' >Sign In</button>
        </div>
        <div className="already-account">
            <p>Do Not Have an Account? <a href="" onClick={signupshift}>Sign Up</a> instead</p>
            
        </div>

        </form>
      </div>
    </div>
  )
}

export default Login
