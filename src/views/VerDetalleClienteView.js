import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Cargando from '../components/Cargando'
import {  editarCliente, obtenerUnCliente } from '../services/clientsService'
import Accordion from 'react-bootstrap/Accordion'
import { Typography } from '@mui/material'
import Swal from 'sweetalert2'

export default function VerDetalleClienteView() {

  

    const [miCliente,setMiCliente] = useState(
      {
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
      }
    )
    const [numeroExtra,setNumeroExtra] = useState(false)
    const [editar, setEditar] = useState(false)

    const {idCliente}= useParams()
    console.log(idCliente)


    const manejarInput = (e) =>{
      setMiCliente({
          ...miCliente,//spread operator de las propiedades inputs
          //era segun el name
          [e.target.name]:e.target.value
      })
  }

  const navigate = useNavigate()

    const manejarSubmit= async(e) =>{
      e.preventDefault()
      try{
          await editarCliente(idCliente,miCliente)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La edición se guardo correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/clientes")
      }catch(error){
        console.log(error)
        

      }

      
    }

    const getCliente= async() =>{
      try{
          const clienteObtenido = await obtenerUnCliente(idCliente)
          
          setMiCliente(clienteObtenido)
          
      }catch(error){
        console.log(error)
      }
  }




    useEffect(()=>{
      
     
    getCliente()
    },[])
    console.log(miCliente)
  return (
    <>
        {miCliente ?
         (
          <Accordion defaultActiveKey="0" >
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                
                <Typography variant="h5">Detalles del Cliente</Typography>

              </Accordion.Header>
              <Accordion.Body >
              
                <form  onSubmit={(e)=>{manejarSubmit(e)}} >
                                <h3 className="h3 mb-3"> Datos Personales </h3>
                                  <div className='card p-3 p-md-1'>
                                      <div className="row ">            
                                        <div className='mb-3 col-xs-12 col-lg-4'>
                                              <label >DNI / Documento de identidad </label>
                                             
                                              {editar
                                               ? (<input type="text" className="form-control"  name="dni_client"  value={miCliente.dni_client}  onChange={(e) => {manejarInput(e)}}/>)
                                              :(<input type="text" className="form-control" readOnly name="dni_client"  value={miCliente.dni_client}/>)}
                                              
                                              
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-4'>
                                              <label>Nombre</label>
                                              {editar
                                               ? (<input type="text" className="form-control"  name="nom_client" onChange={(e) => {manejarInput(e)}} value={miCliente.nom_client} />)
                                              :(<input type="text" className="form-control"  readOnly name="nom_client"  value={miCliente.nom_client} />)}
                                              
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-2'>
                                              <label>Apellido Materno</label>
                                             
                                              {editar
                                               ? ( <input type="text" className="form-control"  name="apemat_client" onChange={(e) => {manejarInput(e)}} value={miCliente.apemat_client}/>)
                                              :( <input type="text" className="form-control" readOnly name="apemat_client"  value={miCliente.apemat_client}/>)}
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-2'>
                                              <label>Apellido Paterno</label>
                                              
                                              {editar
                                               ? ( <input type="text" className="form-control" name="apepat_client" onChange={(e) => {manejarInput(e)}}  value={miCliente.apepat_client}  />)
                                              :(<input type="text" className="form-control" readOnly name="apepat_client"   value={miCliente.apepat_client}  />)}
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-5'>
                                              <label>Correo electrónico</label>
                                              {editar
                                               ? ( <input type="email" className="form-control" name="correo_client"  onChange={(e) => {manejarInput(e)}} value={miCliente.correo_client} />)
                                              :(<input type="email" className="form-control" readOnly name="correo_client"  value={miCliente.correo_client} />)}
                                              
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-5'>
                                              <label>Razón Social</label>
                                              
                                              {editar
                                               ? ( <input type="text" className="form-control" name="raso_client" onChange={(e) => {manejarInput(e)}}  value={miCliente.raso_client}  />)
                                              :(<input type="text" className="form-control"  readOnly name="raso_client"  value={miCliente.raso_client}   />)}
                                        </div>
                                        <div className='mb-3 col-xs-12 col-lg-2'>
                                              <label>Ocupación</label>
                                              {editar
                                               ? ( <input type="text" className="form-control" name="ocupacion_client" onChange={(e) => {manejarInput(e)}}  value={miCliente.ocupacion_client}  />)
                                              :(<input type="text" className="form-control" readOnly name="ocupacion_client"   value={miCliente.ocupacion_client} />)}
                                              
                                        </div>
                                      </div>
                                  </div>
                                  <h3 className="h3 my-3"> Residencia </h3>
                                  <div className="card p-3">
                                    <div className="row">
                                        <div className='mb-3 col-12'>
                                              <label>Dirección Fiscal </label>
                                              
                                              {editar
                                               ? ( <input type="text" className="form-control" name="dirfis_client" onChange={(e) => {manejarInput(e)}}  value={miCliente.dirfis_client}  />)
                                              :(<input type="text" className="form-control " readOnly name="dirfis_client"  value={miCliente.dirfis_client} />)}
                                        </div>
                                        <div className=" mb-3 col-12">
                                            <label >Referencia</label>
                                            
                                            {editar
                                               ? ( <textarea className="form-control" rows={3} placeholder="Ej. a la vuelta del mercado central" onChange={(e) => {manejarInput(e)}} name="refdir_client" style={{maxHeight: "200px"}}  value={miCliente.refdir_client}></textarea>)
                                              :(<textarea className="form-control" rows={3} placeholder="Ej. a la vuelta del mercado central" name="refdir_client" style={{maxHeight: "200px"}}  readOnly value={miCliente.refdir_client}></textarea>)}
                                        </div>
                                    </div>
                                  </div>
                                  <h3 className="h3 my-3"> Contacto</h3>
                                  <div className="card p-3">
                                    <div className="row">
                                        <div className='mb-3 col-xs-6 col-lg-4 '>
                                              <label>Telefono celular </label>
                                              
                                              {editar
                                               ? ( <input type="text" className="form-control" name="telf_client1" onChange={(e) => {manejarInput(e)}}  value={miCliente.telf_client1}  />)
                                              :(<input type="text" className="form-control" name="telf_client1" readOnly  value={miCliente.telf_client1}/>)}
                                        </div>
                                        <div className=" col-xs-6 col-lg-4 ">
                                              {numeroExtra===false?(
                                                <button className="btn btn-warning my-4" readOnly onClick={(e)=>{e.preventDefault();setNumeroExtra(true)}}> Ver segundo numero </button>
                                              ):<>
                                                  <label>Telefono celular 2 </label>
                                                  <div className='input-group'>
                                                      
                                                      {editar
                                               ? (
                                                 <>
                                                 <input type="text" className="form-control" name="telf_client2" onChange={(e) => {manejarInput(e)}} readOnly value={miCliente.telf_client2} />
                                                  <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>{e.preventDefault();setNumeroExtra(false)}}>X</button>
                                                 
                                                 </>
                                                 
                                                 )
                                                :(
                                                <>
                                                <input type="text" className="form-control" name="telf_client2" onChange={(e) => {manejarInput(e)}}  value={miCliente.telf_client2} />
                                                  <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={(e)=>{e.preventDefault();setNumeroExtra(false)}}>X</button>
                                                </>
                                                  )}
                                                  </div>
                                                </>
                                                  
                                                }
                                
                                        </div>
                                        
                                    </div>
                                  </div>
                                  <div className="input-group">

                                     {editar
                                     
                                     ? (
                                      <>
                                        <button className='btn btn-secondary p-3 my-3 right-0' type='submit' >
                                           Guardar Edición
                                        </button>
                                        <button className='btn btn-warning p-3 my-3 right-0' onClick={e=>{e.preventDefault();setEditar(!editar)}}>
                                           Cancelar Edición
                                        </button>
                                      </>
                                     ): 
                                     (
                                      <button className='btn btn-warning p-3 my-3 right-0' onClick={e=>{e.preventDefault();setEditar(!editar)}}>
                                           Editar
                                      </button>
                                     )
                                     }
                                  
                                  </div>
                                 
                      </form>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                  <Typography variant="h5">Ultimas compras del cliente</Typography>
              </Accordion.Header>
              <Accordion.Body>
                                      Comming soon
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        
         
         
         
         ):
          (
            (<Cargando/>)

            
          )
         }
    
    </>
  )
}
