import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const handleVerification = async(e) =>{
    try{
      const response = await fetch('http://localhost:3000/api/auth/send-verify-OTP', {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json();
      if(result.success){
        alert('Verification initiated. Please check your email or enter OTP.');
        navigate('/verifyotp');
      }else {
        alert(`Error: ${result.message}`);
      }
    }catch(error) {
          console.error(error);
          alert('Verification failed. Try again later.');
        }
    navigate('/')
  }

  const handleLogout = async(e)=>{
    try{
      const response = await fetch('http://localhost:3000/api/auth/logout', {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json();
      if(result.success){
        alert('LogOut');
        navigate('/unauth');
      }else {
        alert(`Error: ${result.message}`);
      }
    }catch(error) {
          console.error(error);
          alert('Logged out failed. Try again later.');
        }
  }
  return (
    <div>
      
      <h1>Hello, Welcome Name to the Application</h1>

      <button onClick={handleVerification}>Verify Account</button>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Home
