import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import toast from 'react-hot-toast';

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
        toast.success('Sign up Successful')
        navigate('/');
      }else {
        toast.error(`Error: ${result.message}`);
      }

    }
    catch (err) {
      toast.success('Login failed. Please try again.');
      console.error(err);}
  }
  const handleChange = async (e) =>{
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">
          Create Account
        </h2>
        <p className="text-gray-700 mb-6 text-center">Enter Your Details</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{' '}
          <button
            onClick={shiftlogin}
            className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register
