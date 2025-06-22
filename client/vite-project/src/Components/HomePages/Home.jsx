import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate();
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);

  
  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        // If you have the userId in localStorage or some context, use it here
        const userId = localStorage.getItem('userId'); // or from a context
        const response = await fetch('http://localhost:3000/api/auth/is-auth', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId })
        });
        const result = await response.json();
        if (result.success === false && result.message === "Account Not Verified") {
          setShowVerifyBtn(true);
        } else {
          setShowVerifyBtn(false); // account is verified
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setShowVerifyBtn(false); // fallback to hide
      }
    };

    checkVerificationStatus();
  }, []);
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
      if (result.success) {
      alert('Verification initiated. Please check your email or enter OTP.');
      navigate('/sendemail');
    } else {
      alert(`Error: ${result.message}`);
    }
    }catch(error) {
          console.error(error);
          
          alert('Verification failed. Try again later.');
        }
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

      {showVerifyBtn && (
        <button onClick={handleVerification}>Verify Account</button>
      )}
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Home
