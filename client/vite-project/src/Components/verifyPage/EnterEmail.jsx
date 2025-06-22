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
    <div>
      <form onSubmit={sendResetOtp}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email} // Always defined!
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EnterEmail;
