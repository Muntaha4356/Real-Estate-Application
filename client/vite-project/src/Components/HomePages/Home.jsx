import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import robotImg from '../../assets/robot.png';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate();
  const [showVerifyBtn, setShowVerifyBtn] = useState(false);
  const [username, setUsername]=useState('')
  
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
      toast.success('Verification initiated. Please check your email or enter OTP.');
      navigate('/sendemail');
    } else {
      toast.error(`Error: ${result.message}`);
    }
    }catch(error) {
          console.error(error);
          
          toast.error('Verification failed. Try again later.');
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
        toast.success('LogOut');
        navigate('/unauth');
      }else {
        toast.error(`Error: ${result.message}`);
      }
    }catch(error) {
          console.error(error);
          toast.error('Logged out failed. Try again later.');
        }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4">
      <div className="max-w-xl text-center space-y-6">
        <img src={robotImg} alt="Robot" className="mx-auto w-40 h-40" />

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Hello, {username || 'Developer'}!
        </h1>

        <p className="text-gray-600 text-lg">
          Welcome to the application. Let’s get started!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition"
          >
            Logout
          </button>
          {showVerifyBtn && (
            <button
              onClick={handleVerification}
              className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-full shadow-lg transform hover:scale-105 transition"
            >
              Verify Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home
