import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  const logOut =()=>{
    setLoading(true)
    return signOut(auth)
  }
  const updateUserProfile=(profile)=>{
   return updateProfile(auth.currentUser,profile)
  }

  useEffect(()=>{
     const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setuser(currentUser)
      setLoading(false)
     })
     return()=>{
      unSubscribe()
     }
  },[])
  const authInfo = {
    registerUser,
    signInUser,
    googleSignIn,
    user,
    loading,
    logOut,
    updateUserProfile
  };
  return (
    <div>
      <AuthContext value={authInfo}>{children}</AuthContext>
    </div>
  );
};

export default AuthProvider;