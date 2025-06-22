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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="text-right">
            <button
              type="button"
              onClick={forgotPassword}
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-700">
          Don’t have an account?{' '}
          <button
            onClick={signupshift}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login
