import {useContext} from 'react'
import { AuthContext } from '../context/authContext'
import {Navigate} from 'react-router-dom'

import React from 'react'

export default function ProtectedRoute(props) {
    const{user}=useContext(AuthContext)
  if(user){
      //si esta logueado el usuario
      return props.children//el componente hijo se muestra de ProtectedRoute en este caso las rutas que queremos proteger
  }
  //si no esta logueado no renderiso ningun componente y lo redirijo al login

  return(<Navigate to='/login' replace />)
}
