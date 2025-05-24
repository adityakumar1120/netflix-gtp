import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {app, signInUser, signUpUser} from '../utils/firebase.js';
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

export default function Login() {
  const [isSignInForm , setIsSignInForm] = useState(true)
  const [errorMessage , setErrorMessage] = useState(null)
  const navigate =  useNavigate()
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const dispatch =  useDispatch()
  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm)
    emailRef.current.value = '' 
    passwordRef.current.value  = ''
    
  }
 
  const handleButtonCLick = ()=>{
    let message ;
    isSignInForm ?  message = checkValidData(emailRef.current.value , passwordRef.current.value  ) : message = checkValidData(emailRef.current.value , passwordRef.current.value , nameRef.current.value)
    setErrorMessage(message)
    if(!isSignInForm){
      //sign up
      if(message.emailTest && message.passwordTest && message.nameTest){
        signUpUser(emailRef.current.value, passwordRef.current.value , nameRef.current.value , setErrorMessage , navigate, dispatch)
      console.log('sign up');
    }
    }else{
      //sign in
      if(message.emailTest && message.passwordTest){
      signInUser(emailRef.current.value, passwordRef.current.value , setErrorMessage , navigate )
    }
    }
  }
  console.log(errorMessage);
  return (
    <div className="h-full ">
      <Header />
      <div className="h-full">
        <img className="h-full w-full object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/202ac35e-1fca-44f0-98d9-ea7e8211a07c/web/IN-en-20250512-TRIFECTA-perspective_688b8c03-78cb-46a6-ac1c-1035536f871a_large.jpg" alt="banner" />
      </div>

      <form onSubmit={e => e.preventDefault()} className="flex flex-col px-14 py-10 rounded gap-6 bg-black opacity-[80%]  max-w-[450px] w-full mx-auto absolute top-[18%] left-1/2 -translate-x-1/2">
      <h1 className="text-4xl text-white font-bold mb-4">{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {
          !isSignInForm && <input ref={nameRef} className="bg-[rgba(51,48,48,0.7)] px-4 py-3 text-lg text-white rounded outline-0 border-1 border-[rgba(245,234,234,0.7)] placeholder-gray-200" type="text" placeholder="Full name" />
        }
        <input ref={emailRef} className="bg-[rgba(51,48,48,0.7)] px-4 py-3 text-lg text-white rounded outline-0 border-1 border-[rgba(245,234,234,0.7)] placeholder-gray-200" type="email" placeholder="Email or mobile number" />

        <input ref={passwordRef} className="bg-[rgba(23,23,23,0.7)] px-4 py-3 text-lg text-white rounded outline-0 border-1 border-[rgba(245,234,234,0.7)] placeholder-gray-200" type="password" placeholder="Password" />

        <button
        onClick={handleButtonCLick}
        className="bg-[red] text-white py-2 px-3 rounded font-bold text-xl">{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
        <p className="text-red-400 font-bold">{
          typeof errorMessage !== 'object' ? errorMessage :
          (errorMessage?.emailTest === false && 'invalid Email') || errorMessage?.passwordTest === false && 'invalid password' || errorMessage?.nameTest === false && 'Enter your name' 
          }</p>

        <p onClick={toggleSignInForm} className="cursor-pointer text-[#c4ccc3] mt-2">{isSignInForm ? 'New to Netflix?' : 'Already have an Account?'}<span className="text-white font-bold">{isSignInForm ? 'Sign up now.' : 'Sign In now'} </span></p>
      </form>
    </div>
  );
}
