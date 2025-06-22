import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
      alert('No email found. Redirecting...');
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
      alert('Please enter full OTP and a new password.');
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
        alert('Password reset successful!');
        navigate('/signin');
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <p className="text-gray-500 mb-6">Enter the 6-digit OTP sent to your email and your new password.</p>

        <div className="flex justify-center gap-2 mb-4">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-10 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={value}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </div>

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetOtpVerify;


