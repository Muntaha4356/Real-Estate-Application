export const handlesendingOTP = async(e) =>{
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
        navigate('/sendemail');
      }else {
        alert(`Error: ${result.message}`);
      }
    }catch(error) {
          console.error(error);
          alert('Verification failed. Try again later.');
        }
  }