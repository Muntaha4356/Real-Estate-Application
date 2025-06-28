import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  
  <Toaster position="top-center" reverseOrder={false} />
    <GoogleOAuthProvider clientId="244631017859-845o6r2dug776piglqkq0cm6q1sbbtai.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </BrowserRouter>,
)
