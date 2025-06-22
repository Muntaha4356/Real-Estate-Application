export const verifiyOTP = async (e, otp) => {
    const otpValue = otp.join('');
    console.log("Verifying OTP:", otpValue);
    
    // Add your OTP verification logic here
    try {
      const response = await fetch('http://localhost:3000/api/auth/verifyOtp', {
        method:'POST',
        credentials: 'include',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      const result = await response.json();
      if(result.success){
        alert('Verification initiated');
      }else {
        alert(`Error: ${result.message}`);
      }

    }catch(error){
      console.error(error);
      alert('Otp send Failed. Please try again');
    }
  };