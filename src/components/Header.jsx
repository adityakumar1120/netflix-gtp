import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { useNavigate } from 'react-router';

export default function Header() {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid , displayName, email , photoURL} = user;
        dispatch(addUser({uid : uid , displayName : displayName, email : email , photoURL : photoURL}))
        navigate('/browse')
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
      }
    });
  }, []);
  const handleSignOut= ()=>{
    signOut(auth).then(() => {
      navigate('/')
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }
  return (
    <div className='bg-gradient-to-b from-black w-full absolute'>
        <div className='max-w-[1300px] flex justify-between '>
            <div className='logo w-44'>
                <img src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo" />
            </div>
            {
              user && <div className='flex gap-1 items-center'>
              <div className='w-[30px] h-[30px] flex '>
                <img className='object-cover' src={user.photoURL} alt="" />
              </div>
              <button
              onClick={handleSignOut}
              className='text-white cursor-pointer'>(sign out)</button>
            </div>
            }
        </div>
    </div>
  )
}
