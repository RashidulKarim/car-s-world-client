import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInit from "../Pages/Authentication/FirebaseSetUp/firebase.init";

firebaseInit();
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth();

    const signUp = (email, password, name, history) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
            updateProfile(auth.currentUser, {
                displayName: name
              }).then(() => {
                  const userInfo = {email, displayName: name}
                  setUser(userInfo)
                history.push('/')
                window.location.reload()
              }).catch((err) => {
                setError(err.message)
              });
            setError('')
        })
        .catch(err =>{
            setError(err.message)
            
        })
    }

    const logOut = () => {
        signOut(auth)
        .then(res =>{
            //user signOut
            setError('')
            alert("Successfully signOut")
        })
        .catch(err => {
            setError(err.message)
        })
    }

    const logIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            //user sign in
            setError('')
        })
        .catch(err => {
            setError(err.message)
        })
    }


    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
            } else {
              setUser('')
            }
          });
    },[])
    
    return {
        signUp,
        error,
        user,
        logOut,
        logIn
    }
};

export default useFirebase;