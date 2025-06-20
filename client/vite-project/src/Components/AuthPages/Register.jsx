import React from 'react'

const Register = () => {
  return (
    <div>
      <div className="container">
        <h1>Create Account</h1>
        <p>Enter Your Details</p>
        <form action="">
        <div className="name">
            <input name='text' type="text" placeholder='Name'/>
        </div>
        <div className="Email">
            <input name='email' type="email" placeholder='Email' />
        </div>
        <div className="Password">
            <input name='password' type="password" placeholder='Password' />
        </div>
        
        <div className="signup-div">
            <button type='submit'>Sign up</button>
        </div>
        <div className="already-account">
            <p>Already Have a Account? <a href="">Sign In</a> instead</p>
            
        </div>

        </form>
      </div>
    </div>
  )
}

export default Register
