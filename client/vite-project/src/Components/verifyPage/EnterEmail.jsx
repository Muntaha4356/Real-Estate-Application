import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterEmail = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const sendResetOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/auth/send-reset-otp', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const result = await response.json();

      if (result.success) {
        alert('Password Reset OTP sent. Please check your email.');
        navigate('/resetOtpverify', { state: { email } })
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(error);
      alert('OTP sending failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c9d6ff] to-[#e2e2e2]">
      <form
        onSubmit={sendResetOtp}
        className="bg-[#0f172a]/90 text-white p-8 rounded-2xl shadow-2xl w-full max-w-sm backdrop-blur-sm"
      >
        {/* Heading */}
        <h2 className="text-xl font-semibold mb-2">Reset password</h2>
        <p className="text-sm text-gray-300 mb-6">Enter your registered email address</p>

        {/* Email Field */}
        <div className="flex items-center gap-2 bg-[#1e293b] px-4 py-2 rounded-lg mb-4 focus-within:ring-2 ring-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EnterEmail;
