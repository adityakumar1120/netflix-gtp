// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ygBGQR9IEP3DLjjHcnmVFb0WYcBArwk",
  authDomain: "netflixgpt-76da3.firebaseapp.com",
  projectId: "netflixgpt-76da3",
  storageBucket: "netflixgpt-76da3.firebasestorage.app",
  messagingSenderId: "1098440270002",
  appId: "1:1098440270002:web:704845f8848a754685a9ab",
  measurementId: "G-GQ3EEXL300"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()

export const signUpUser = (email, password, name, setErrorMessage, navigate, dispatch) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: "https://tse1.mm.bing.net/th?id=OIP.xqdv8qjbRG39ZEohog1v3gHaHa&pid=Api&P=0&h=180"
      }).then(() => {
        // Profile updated!
        const { uid, displayName, email, photoURL } = auth.currentUser;
        dispatch(addUser({ uid: uid, displayName: displayName, email: email, photoURL: photoURL }))
        navigate('/browse')
      }).catch((error) => {
        setErrorMessage(error)
      });
      // console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode, errorMessage)
    });
}

export const signInUser = (email, password, setErrorMessage, navigate) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      navigate('/browse')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode, errorMessage)
    });
}