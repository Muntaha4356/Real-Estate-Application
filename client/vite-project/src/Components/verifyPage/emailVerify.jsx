import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EmailVerify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const navigate = useNavigate();
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    const otpValue = otp.join('');
    console.log("Verifying OTP:", otpValue);

    try {
      const response = await fetch('http://localhost:3000/api/auth/verifyOtp', {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          otp: otpValue,
        })
      })
      const result = await response.json();
      if(result.success){
        toast.success('Verification initiated');
        navigate('/');
      }else {
        toast.error(`Error: ${result.message}`);
      }

    }catch(error){
      console.error(error);
      toast.error('Otp send Failed. Please try again');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#cbd5ff] via-[#e6ccff] to-[#f9e6ff] px-4">
  <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
    <h2 className="text-2xl font-bold text-white mb-2">Email Verify OTP</h2>
    <p className="text-white/80 text-sm mb-6">Enter the 6-digit code sent to your email id.</p>

    <div className="flex justify-center gap-2 mb-6">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-10 h-12 text-center text-xl rounded-md bg-white/90 text-gray-800 border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>

    <button
      onClick={handleSubmit}
      className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
    >
      Verify email
    </button>
  </div>
</div>

  );
};

export default EmailVerify;