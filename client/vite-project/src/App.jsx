import './App.css'
import Login from './Components/AuthPages/Login'
import Register from './Components/AuthPages/Register'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/HomePages/Home'
import EmailVerify from './Components/verifyPage/EmailVerify'
import OTPverify from './Components/verifyPage/ResetOtpverify'
import UnAuthhome from './Components/HomePages/UnAuthhome'
import EnterEmail from './Components/verifyPage/EnterEmail'
import ResetOtpVerify from './Components/verifyPage/ResetOtpverify'
import ProtectedRoute from './Components/ProtectionRoute'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/unauth' element= {<UnAuthhome/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/signin' element={<Login/>}/>
        <Route path='/sendemail' element={<EmailVerify/>}/>
        <Route path='/verifyotp' element={<OTPverify/>}/>
        <Route path='/email-enter' element={<EnterEmail/>}/>
        <Route path='/resetOtpverify' element={<ResetOtpVerify/>}/>
        

      </Routes>
    </>
  )
}

export default App
