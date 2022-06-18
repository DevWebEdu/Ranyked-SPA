import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { crearCliente } from '../services/clientsService'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function AgregarClienteView() {
  const [inputs,setInputs] = useState({
    nom_client:"",//nombre del cliente
    dni_client:"",//dni del cliente}
    raso_client:"",//razon social
    apemat_client:"",//apellido materno
    apepat_client:"", //apellido paterno
    dirfis_client:"",//direccion fiscal
    correo_client:"",//correo electronico
    refdir_client:"",//referencia direccion fiscal
    telf_client1:"",//telefono 1 obligatorio
    telf_client2:"",//telefono 2 no obligatorio
    ocupacion_client:""//ocupacion
  })

  const [numeroExtra,setNumeroExtra] = useState(false)

  const manejarInput = (e) => {
    console.log(e)
    setInputs({
      ...inputs,
      [e.target.name]:e.target.value
    })
  }
  const navigate= useNavigate()

  const manejarSubmit = async(e)=>{
    e.preventDefault()
    try{
      await crearCliente(inputs)
      Swal.fire({
        icon:"success",
        title:"Cliente Creado Satisfactoriamente"
      })
      setInputs({
        nom_client:"",//nombre del cliente
        dni_client:"",//dni del cliente}
        raso_client:"",//razon social
        apemat_client:"",//apellido materno
        apepat_client:"", //apellido paterno
        dirfis_client:"",//direccion fiscal
        correo_client:"",//correo electronico
        refdir_client:"",//referencia direccion fiscal
        telf_client1:"",//telefono 1 obligatorio
        telf_client2:"",//telefono 2 no obligatorio
        ocupacion_client:""//ocupacion
      })
      navigate("/clientes")
    }catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
    
    
            <Typography variant="h3" className="my-4">Agregar Nuevo Cliente</Typography>
                <form className="accordion-body" onSubmit={e=>manejarSubmit(e)}>
                                <h3 className="h3 mb-3"> Datos Personales </h3>
                                  <div className='card p-3 '>
                                      <div className="row ">            
                                        <div className='mb-3 col-xs-12 col-lg-4'>
                                              <label>DNI / Documento de identidad </label>
                                              <input type="text" className="form-control" name="dni_client" onChange={(e) => {manejarInput(e)}} value={inputs.dni_client}/>
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-4'>
                                              <label>Nombre</label>
                                              <input type="text" className="form-control" name="nom_client" onChange={(e) => {manejarInput(e)}} value={inputs.nom_client} />
                                        </div>
                                        <div className='mb-3 col-xs-6 col-lg-2'>
                                              <label>Apellido Materno</label>
                                              <input type="text" className="form-control"  name="apemat_client" onChange={(e) => {manejarInput(e)}} value={inputs.apemat_client}/>
                                        </div>
                                        <div className='mb-3 col-xs-6 col-lg-2'>
                                              <label>Apellido Paterno</label>
                                              <input type="text" className="form-control" name="apepat_client"  onChange={(e) => {manejarInput(e)}} value={inputs.apepat_client}  />
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-5'>
                                              <label>Correo electrónico</label>
                                              <input type="email" className="form-control" name="correo_client" onChange={(e) => {manejarInput(e)}} value={inputs.correo_client} />
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-5'>
                                              <label>Razón Social</label>
                                              <input type="text" className="form-control" name="raso_client" onChange={(e) => {manejarInput(e)}} value={inputs.raso_client}   />
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-2'>
                                              <label>Ocupación</label>
                                              <input type="text" className="form-control" name="ocupacion_client" onChange={(e) => {manejarInput(e)}}  value={inputs.ocupacion_client} />
                                        </div>
                                      </div>
                                  </div>
                                  <h3 className="h3 my-3"> Residencia </h3>
                                  <div className="card p-3">
                                    <div className="row">
                                        <div className='mb-3 col-12'>
                                              <label>Dirección Fiscal </label>
                                              <input type="text" className="form-control " name="dirfis_client" onChange={(e) => {manejarInput(e)}} value={inputs.dirfis_client} />
                                        </div>
                                        <div className=" mb-3 col-12">
                                            <label >Referencia</label>
                                            <textarea className="form-control" rows={3} placeholder="Ej. a la vuelta del mercado central" name="refdir_client" style={{maxHeight: "200px"}} onChange={(e) => {manejarInput(e)}}  value={inputs.refdir_client}></textarea>
                                            
                                        </div>
                                    </div>
                                  </div>
                                  <h3 className="h3 my-3"> Contacto</h3>
                                  <div className="card p-3">
                                    <div className="row">
                                        <div className='mb-3 col-xs-12 col-lg-4'>
                                              <label>Telefono celular </label>
                                              <input type="text" className="form-control" name="telf_client1"  onChange={(e) => {manejarInput(e)}} value={inputs.telf_client1}/>
                                        </div>
                                        <div className=" col-xs-12 col-lg-4 ">
                                              {numeroExtra===false?(
                                                <button className="btn btn-warning my-4"  onClick={(e)=>{e.preventDefault();setNumeroExtra(true)}}> Agregar un numero mas </button>
                                              ):<>
                                                  <label>Telefono celular 2 </label>
                                                  <div className='input-group'>
                                                      <input type="text" className="form-control" name="telf_client2" onChange={(e) => {manejarInput(e)}}  value={inputs.telf_client2} />
                                                      <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>{e.preventDefault();setNumeroExtra(false)}}>X</button>
                                                  </div>
                                                </>
                                                  
                                                }
                                
                                        </div>
                                        
                                    </div>
                                  </div>

                                  <button className='btn btn-warning p-3 my-3 right-0'>
                                            Agregar Cliente
                                  </button>
                      </form>
  


    
    
    
    
    </div>

  )
}
