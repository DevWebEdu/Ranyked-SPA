import React,{ useState,useEffect,createContext } from "react";
import { GoogleAuthProvider , signInWithPopup,onAuthStateChanged,signOut} from 'firebase/auth'
import {auth} from "../config/firebaseConfig"


export const AuthContext = createContext()
const provedorGoogle = new GoogleAuthProvider()

export const AuthContextProvider = (props) =>{
    const [ user,setUser] = useState(null)

    const signInGoogle = async()=>{
        try {
            const resultado = await signInWithPopup(auth,provedorGoogle)
            return resultado
        } catch (error) {
            console.log({error})
        }
    }



    const salir = ( )=> signOut(auth) 
    useEffect(()=>{
        return onAuthStateChanged(auth,(usuario)=>{
            //cuando el usuario esta logueado me devuelve la info del usuario 
            //cuando no retorna null
            setUser(usuario)

        })
    },[])


    return( 
    <AuthContext.Provider value={{user,signInGoogle,salir}}>
                {props.children}
    </AuthContext.Provider>)
}