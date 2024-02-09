import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = '838351538381-10s01g3jir7rof8rrlk588rkdshiocn1.apps.googleusercontent.com';
console.log(clientId,"client id");

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
  <React.StrictMode>

      <App />
 
  </React.StrictMode>
</GoogleOAuthProvider>

)
