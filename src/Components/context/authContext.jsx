import { auth } from "../Firebase";
import React, { useState, useEffect, createContext, useContext } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const db = getFirestore(); 

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
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

  const register = async (email, password, firstName, lastName) => {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: `${firstName} ${lastName}` });
    console.log(response);
  };

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };

  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  const uploadPost = async (text, image) => {
    if (!auth.currentUser) {
      throw new Error("Usuario no autenticado");
    }
    const post = {
      text,
      image,
      userName: auth.currentUser.displayName,
      userId: auth.currentUser.uid,
      createdAt: serverTimestamp()
    };
    await addDoc(collection(db, "posts"), post);
    console.log("Publicación guardada con éxito");
  };

  return (
    <authContext.Provider value={{ register, login, logout, user, loginWithGoogle, uploadPost }}>
      {children}
    </authContext.Provider>
  );
}
