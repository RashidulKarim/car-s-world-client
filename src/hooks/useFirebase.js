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
            updateProfile(auth.currentUser, {
                displayName: name
              }).then(() => {
                  const userInfo = {email, displayName: name}
                  setUser(userInfo)
                  fetch("https://enigmatic-ocean-15470.herokuapp.com/users",{
                      method:'POST',
                      headers:{
                          'content-type':'application/json'
                      },
                      body:JSON.stringify({name: userInfo.displayName, email: userInfo.email, role: 'user' })
                  })
                  .then(res =>res.json() )
                  .then(data =>{   
                  })
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
    },[])
    
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