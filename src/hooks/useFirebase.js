import axios from "axios";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInit from "../Pages/Authentication/FirebaseSetUp/firebase.init";

firebaseInit();
const useFirebase = () => {
    const [user, setUser] = useState({})
    const [error, setError] = useState('')
    const auth = getAuth();
    const [isLoading, setIsLoading] = useState(true)

    const signUp = (email, password, name, history) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(res =>{
            signOut(auth) 
            alert("SignUp Successfully , please login.")
            history.push("/login")
            updateProfile(auth.currentUser, {
                displayName: name
              }).then(() => {
                  const userInfo = {email, displayName: name}
                //   setUser(userInfo)
                const info = {name: userInfo.displayName, email: userInfo.email, role: 'user' }
                  axios.post("https://cars-world-server.herokuapp.com/users",{
                      info
                  })
                  .then(data =>{ 
                    
                  })
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

    const logIn = (email, password, history, from) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            history.replace(from);
            setError('')
        })
        .catch(err => {
            setError(err.message)
        })
    }


    useEffect(()=>{
        setIsLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                
              setUser(user)
              setIsLoading(false)
            } else {
              setUser('')
              setIsLoading(false)
            }
          });
    },[auth])
    
    return {
        signUp,
        error,
        user,
        logOut,
        logIn,
        isLoading,
    }
};

export default useFirebase;