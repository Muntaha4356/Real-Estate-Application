import React from 'react'
import { useNavigate } from 'react-router-dom';
import robotImg from '../../assets/robot.png';
const UnAuthhome = () => {
  const navigate = useNavigate();
  const handleLogin = async() =>{
    navigate('/signin')
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-xl text-center space-y-6">
        
        
        <img
  src={robotImg}
  alt="Robot"
  className="mx-auto w-40 h-40"
/>

        {/* Heading & Subtext */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Hey Developer! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to our app
          <br />
          Let's start with a quick product tour and we will have you up and running in no time!
        </p>

        {/* Call-to-Action Button */}
        <button
          onClick={handleLogin}
          className="mt-4 inline-block px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}

export default UnAuthhome
