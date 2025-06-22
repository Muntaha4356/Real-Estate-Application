import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        alert('Verification initiated');
        navigate('/');
      }else {
        alert(`Error: ${result.message}`);
      }

    }catch(error){
      console.error(error);
      alert('Otp send Failed. Please try again');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
        <p className="text-gray-500 mb-6">Enter the 6-digit code sent to your email.</p>
        
        <div className="flex justify-center gap-2 mb-6">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              className="w-10 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;

