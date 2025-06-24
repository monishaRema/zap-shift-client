import React, { use, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";
import { auth } from '../Firebase/firebase.init';



const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    const createUser = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(()=>{

        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    },[])

   const authInfo ={
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        logOut
    }
    return (
           
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
         
    );
};

export default AuthProvider;