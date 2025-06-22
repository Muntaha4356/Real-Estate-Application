import React from 'react'
import { useNavigate } from 'react-router-dom';

const UnAuthhome = () => {
  const navigate = useNavigate();
  const handlLogin = async() =>{
    navigate('/signin')
  }
  const handleSignUp = async() =>{
    navigate('/signup')
  }
  return (
    <div>
      <h1>This is Authorized Account</h1>
      <button onClick={handlLogin}>Login</button>
      <button onClick={handleSignUp}>SignUp</button>
    </div>
  )
}

export default UnAuthhome
