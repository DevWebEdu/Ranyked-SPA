import React,{useState,useEffect}from 'react'
import TextField from '@mui/material/TextField';
import { eliminarCliente, obtenerClientes } from '../services/clientsService'
import {Link} from 'react-router-dom'
import WorkIcon from '@mui/icons-material/Work';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Swal from 'sweetalert2';
import man from '../assets/man.png'
import './ClientsView.css'

export default function ClientsView() {



  const [clientes,setClientes]=useState([])
  const getClients=async()=>{
    try {
        const clientsObtenidos= await obtenerClientes()
        // console.log(clientsObtenidos)
        setClientes(clientsObtenidos)
      } catch (error) {
        throw error
      }
  }

  const deleteCliente= async(idCliente) =>{
    try {
      const resultado =  await Swal.fire({
        title:'¿Desea Eliminar Este Cliente?',
        showCancelButton:true,
        confirmButtonText:'Si,Eliminar',
        cancelButtonText:'No,cancelar'
      })
      if(resultado.isConfirmed){
        await eliminarCliente(idCliente)
        Swal.fire({
          title:'Cliente Eliminado Satisfactoriamente!!',
          icon:"success"
        })
        getClients()
      }
    } catch (error) {
       console.log(error)
    }
  }
  useEffect(()=>{
      getClients()
  },[])

  return (
    <>
        <p className="h1 text-center mt-4">Clientes</p>
   
        <div className="row justify-content-center  mt-2 ">
            {clientes.map(({id,
                            dni_client,
                            nom_client,             
                            ape_client,                        
                            foto_client,
                            ocupacion_client},
                            i)=>(
                              <div className="card-me py-1 mt-3   col-lg-3 col-md-6 col-sm-4 col-12 " key={i}>
            <div className='card-me__contain-img'>
              <img src={foto_client} alt={nom_client}/>
            </div>
            <div className='card-me___contain-text'>
              <small>DNI:{dni_client}</small>
              <h5>{nom_client}{" "}{ape_client}</h5>
              <div className='card-me___contain-text__contain-ocupacion' >
                <WorkIcon sx={{margin:"0",color:"rgba(184, 96, 52,0.858)"}}></WorkIcon>
                <p>{ocupacion_client}</p>
              </div>
            </div>
            <div className='card-me__contain-button'>
              <Link to={`/clientes/${id}`} className='card-me__contain-button__btn' >Ver detalles</Link>
              <button className='card-me__contain-button__btn'  onClick={e=>deleteCliente(id)}> Eliminar</button>
            </div>

        </div>

                        

                ))}
        </div>
        


        <Link to="/agregarcliente" className="position-fixed bottom-0 end-0  m-3">
          <Fab size="small" color="secondary" aria-label="add" >
            <AddIcon />
          </Fab>
        </Link>
    </>
  )
}
