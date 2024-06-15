import {auth} from "../Firebase";
import React, { useState, useEffect, createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context){
        console.log("error creating auth context")
    }
    return context;
};

export function AuthProvider({ children }) {
    const [user, setUser] = useState("");
  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario en sesion");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => subscribed();
  }, []);
    const register = async (email, password) =>{
       const response = await createUserWithEmailAndPassword(auth, email, password);
       console.log(response);
    };
    const login = async(email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log(response)
    };
const logout = async () => {
    const response = await signOut(auth);
        console.log(response)
    };
    const loginWithGoogle = async () => {
      const responseGoogle = new GoogleAuthProvider();
      return await signInWithPopup(auth, responseGoogle);
    };

    return (
    <authContext.Provider value={{register, login, logout, user, loginWithGoogle}}>
        {children}
    </authContext.Provider>
    );
}