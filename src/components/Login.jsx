import React from 'react'
import logo from './logo.png'
import GoogleButton from 'react-google-button'
import {auth} from '../firebase'
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth'
const Login = () => {
    const googleSignIn=()=>{
        const provider = new GoogleAuthProvider()
        signInWithRedirect(auth,provider);
    }
  return (
    <div className='h-full w-full flex items-center justify-center flex-col bg-[#1a0000]'>
      <img src={logo} alt="LOGO" className='w-[70%] md:w-[40%] lg:w-[20%]'/>

        <GoogleButton className='mt-5' onClick={googleSignIn}/>
    </div>
  )
}

export default Login
