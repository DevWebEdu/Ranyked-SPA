
import React, {useState,useEffect, useContext} from 'react'
import Watch from '../components/Watch'
import { obtenerClientes } from '../services/clientsService'
import {obtenerProductos} from '../services/productsService'
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material'
import { obtenerVentas } from '../services/salesService'
import { AuthContext } from '../context/authContext'

export default function HomeView() {
  const [clients,setClients]= useState([])
  const [products,setProducts] = useState([])
  const [ventas,setVentas] = useState([])

  const {user} = useContext(AuthContext)


  const getClientes = async()=>{
    try {
      const clientsObtenidos= await obtenerClientes()
      setClients(clientsObtenidos)
    } catch (error) {
      throw error
    }
  }

  const getProducts = async()=>{
    try {
      const productsObtenidos=await obtenerProductos()
      setProducts(productsObtenidos)
    } catch (error) {
      throw error
    }
  }

  const getVentas = async ( )=>{
    try {
      const ventasObtenidas = await obtenerVentas()
      setVentas(ventasObtenidas)
    } catch (error) {
      throw error
    }
  }

  useEffect(()=>{
    getClientes()
    getProducts()
    getVentas()
  },[])


  return (
    <>
    <div className='row my-5 '>
        
        
        <div className='col-12 col-lg-6 my-3' style={{display:"flex" , alignItems:"center"}}>
           <Typography variant="h1" sx={{width:"100%",fontWeight:"bolder", fontSize:{md:"48px",lg:"64px",sm:"40px",xs:"36px"},textAlign:"center"}}>Bienvenido  Unnamed </Typography>
        </div>
        <div className='col-12 col-lg-6 my-3' >
           <Watch/>
        </div>
        
    </div>
    <div className="row g-2">
      <div className="card col-lg-4 mt-4 text-center ">
        <h5 className="card-header text-white bg-black">Clientes</h5>
        <div className="card-body">
         
          <p className="card-text">Por el momento se encuentran {clients.length} clientes </p>
          <Link to="/clientes" className="btn btn-dark">Dashboard</Link>
        </div>
      </div>

      <div className="card col-lg-4 mt-4  text-center ">
        <h5 className="card-header text-white bg-black ">Productos</h5>
        <div className="card-body">
           
          <p className="card-text">Por el momento se encuentran {products.length} productos</p>
          <Link to="/productos" className="btn btn-dark">Dasboard</Link>
        </div>
      </div>

      <div className="card col-lg-4 mt-4  text-center ">
        <h5 className="card-header text-white bg-black ">Ventas</h5>
        <div className="card-body">
          
          <p className="card-text">Por el momento se encuentran {ventas.length} productos</p>
          <Link to="/ventas" className="btn btn-dark">Dasboard</Link>
        </div> 
      </div>
    </div>
    </>
  )
}
