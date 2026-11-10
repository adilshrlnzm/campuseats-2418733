import { useEffect, useState } from 'react'
import {
 createUserWithEmailAndPassword, signInWithEmailAndPassword,
 signInWithPopup, GoogleAuthProvider, signOut,
 onAuthStateChanged, updateProfile,
 sendPasswordResetEmail,  
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth-context.js'

export function AuthProvider({ children }) {
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
     setUser(firebaseUser)
     setLoading(false)
   })
   return unsubscribe
 }, [])

 async function register(name, email, password) {
   const credential = await createUserWithEmailAndPassword(auth, email, password)
   await updateProfile(credential.user, { displayName: name })
   setUser({ ...credential.user, displayName: name })
 }

 function login(email, password) {
   return signInWithEmailAndPassword(auth, email, password)
 }

 function loginWithGoogle() {
   return signInWithPopup(auth, new GoogleAuthProvider())
 }

 function logout() {
   return signOut(auth)
 }

 // 2. Add the reset function
 function resetPassword(email) {
   return sendPasswordResetEmail(auth, email)
 }

 // 3. Add resetPassword to the value object
 const value = { user, loading, register, login, loginWithGoogle, logout, resetPassword }
 
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}