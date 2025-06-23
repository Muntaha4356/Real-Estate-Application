import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetOtpVerify = () => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      toast.error('No email found. Redirecting...');
      navigate('/email-enter');
    }
  }, [location, navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!isNaN(value) && value.length <= 1) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Move to next input
      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      e.preventDefault();

      const updatedOtp = [...otp];

      if (otp[index]) {
        updatedOtp[index] = '';
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        updatedOtp[index - 1] = '';
        setOtp(updatedOtp);
      }
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length !== 6 || !newPassword) {
      toast.error('Please enter full OTP and a new password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp: finalOtp,
          newPassword
        })
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Password reset successful!');
        navigate('/signin');
      } else {
        toast.error(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#cbd5ff] via-[#e6ccff] to-[#f9e6ff] px-4">
  <div className="backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
    <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
    <p className="text-white/80 text-sm mb-6">
      Enter the 6-digit OTP sent to your email and your new password.
    </p>

    <div className="flex justify-center gap-2 mb-6">
      {otp.map((value, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-12 h-14 text-center text-xl rounded-md bg-white/90 text-gray-800 border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={value}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>

    <input
      type="password"
      placeholder="New Password"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className="w-full px-4 py-3 mb-6 bg-white/90 text-gray-800 rounded-md border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />

    <button
      onClick={handleSubmit}
      className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition font-semibold"
    >
      Reset Password
    </button>
  </div>
</div>

  );
};

export default ResetOtpVerify;