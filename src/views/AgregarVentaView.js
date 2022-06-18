import {   Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Cargando from '../components/Cargando'
import { obtenerClientes, obtenerUnCliente } from '../services/clientsService'
import { obtenerProductos, obtenerUnProducto } from '../services/productsService'
import { crearVenta } from '../services/salesService'

export default function AgregarVentaView() {

    const [clientes,setClientes] = useState([])
    const [clienteId,setClienteId] = useState({id:1})
    const [miCliente,setMiCliente] =useState(
        {
            id:1,
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
    const [openClient,setOpenClient] = useState(false)
    const [productos,setProductos] =useState([])
    const [productoId,setProductoId]= useState({id:1})
    const [producto,setProducto] = useState({
        id:1,
        nom_prod:"",
        autor_prod:"",
        tipo_prod:"",
        precio_prod:"",
        cant_prod:"",
        desc_prod:"",
        edicion_prod:""
    })
    const [openProduct,setOpenProduct]=useState(false)

    const [inputVentas,setInputVentas] = useState({
        idCliente:"",
        idProducto:"",
        cant_venta:"",
        num_documento:"",


    })

    console.log(clienteId.id)
    console.log(productoId.id)
    
    const navigate = useNavigate() 

    const manejarSubmit  = async (e) =>{
        e.preventDefault()
        try {
            // Cuando se tengan datos que son obtenidos fuera de los inputs o por otra tabla es mejor destructurar
            await crearVenta({...inputVentas,idCliente:clienteId.id,
                idProducto:productoId.id})
            Swal.fire({
                icon:"success",
                title:"Venta Creado Satisfactoriamente"
            })
            navigate("/ventas")
        } catch (error) {
            console.log(error)
        }
    }
    

    const getProductos = async()=>{
        try {
            const productosObtenidos= await obtenerProductos()
            console.log(productosObtenidos)
            setProductos(productosObtenidos)
        } catch (error) {
            console.log(error)
        }
    }

    const getOneProduct = async() => {
        try {
            const productoObtenido=await obtenerUnProducto(productoId.id)
            console.log(productoObtenido)
            setProducto(productoObtenido)
        } catch (error) {
            console.log(error)
        }
    }

    const getClientes = async() =>{
        try {
            const clientesObtenidos  = await obtenerClientes()
            console.log(clientesObtenidos)
            setClientes(clientesObtenidos)
        } catch (error) {
            console.log(error)
        }
    }

    const getOneClient = async () =>{
        try {
            const clienteObtenido = await obtenerUnCliente(clienteId.id)
            console.log(clienteObtenido)
            setMiCliente(clienteObtenido)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getProductos()
        getOneProduct()
        
    },[productoId])

    useEffect(()=>{
        getClientes()
        getOneClient()
    },[clienteId])
   
   
    
    
    const manejarInputCliente = (e) => {
        console.log(e)
        setClienteId({
          ...clienteId,
          [e.target.name]:e.target.value
        })
      }

      const manejarInputProducto= (e) => {
        console.log(e)
        setProductoId({
          ...productoId,
          [e.target.name]:e.target.value
        })
      }


      const manejarInputs= (e) => {
        console.log(e)
        setInputVentas({
          ...inputVentas,
          [e.target.name]:e.target.value
        })
      }
    

  return (
    <>
    <form onSubmit={e=>manejarSubmit(e)}>
    {clientes ? (
        <>  
            <Typography variant= "h4" >Datos Cliente</Typography>
            <div className='card p-3'>
                <div className='row'>
                    <div className='col-xs-6 col-lg-4 mb-3'>
                            <label>Selecciona a el cliente</label>
                            <select
                            className='form-select'
                            name="id"
                            value={clienteId.id}
                            onChange={e=>manejarInputCliente(e)}
                            >
                            {clientes.map(({id,nom_client},i)=>(
                                <option value={id} key={i}>
                                    {nom_client}
                                </option>
                            ))}
                            </select>
                    </div>
                    
                            {openClient 
                            ?(
                                <>
                                    <div className='col-xs-6 col-lg-4 my-4'>
                                        <button className='btn btn-primary' onClick={e=>setOpenClient(!openClient)}>Colapsar</button>
                                    </div>
                                    <div className='row col-12'>
                                            <div className="col-xs-6 col-lg-4 mb-3">
                                                <label>Documento de identidad</label>
                                                <input value={miCliente.dni_client} readOnly className='form-control'  />   
                                            </div>
                                            <div className="col-xs-6 col-lg-4 mb-3">
                                                <label>Ocupacion</label>
                                                <input value={miCliente.ocupacion_client} readOnly className='form-control'  />   
                                            </div>
                                    </div>
                                </>
                                
                            )
                            :(
                                <div className='col-xs-6 col-lg-4 my-4'>
                                    <button className='btn btn-warning' onClick={e=>setOpenClient(!openClient)}>Ampliar</button>
                                </div>
                                
                            )}
                    
                </div>
            </div>

           
        
        
        </>
    ): <Cargando/>}
    <>
    {productos?(
             <>
             <Typography variant= "h4" >Datos del producto</Typography>
             <div className='card p-3'>
                 <div className='row'>
                     <div className='col-xs-6 col-lg-4 mb-3'>
                             <label>Selecciona a el Producto</label>
                             <select
                             className='form-select'
                             name="id"
                             value={productoId.id}
                             onChange={e=>manejarInputProducto(e)}
                             >
                             {productos.map(({id,nom_prod},i)=>(
                                 <option selected value={id} key={i}>
                                     {nom_prod}
                                 </option>
                             ))}
                             </select>
                     </div>
                     {openProduct
                            ?(
                                <>
                                    <div className='col-xs-6 col-lg-4 my-4'>
                                        <button className='btn btn-primary' onClick={e=>setOpenProduct(!openProduct)}>Colapsar</button>
                                    </div>
                                    <div className='row col-12'>
                                            <div className="col-xs-6 col-lg-4 mb-3">
                                                <label>Nombre del producto</label>
                                                <input value={producto.nom_prod} readOnly className='form-control'  />   
                                            </div>
                                            <div className="col-xs-6 col-lg-4 mb-3">
                                                <label>Edicion del Libro</label>
                                                <input value={producto.edicion_prod} readOnly className='form-control'  />   
                                            </div>
                                    </div>
                                </>
                                
                            )
                            :(
                                <div className='col-xs-6 col-lg-4 my-4'>
                                    <button className='btn btn-warning' onClick={e=>setOpenProduct(!openProduct)}>Ampliar</button>
                                </div>
                                
                            )}
                </div>
            </div>  
            </>     
        ):(
            <Cargando/>
        )}
    </>
        <>
            <Typography>Datos de la venta</Typography>
            <div className='card p-2' >
                <div className="row">
                    <div  className='col-xs-6 col-lg-4 my-4'>
                        <label>Cantidad </label>
                        <input type="number" name='cant_venta' onChange={(e) => {manejarInputs(e)}} className="form-control"/>
                    </div>
                    <div  className='col-xs-6 col-lg-4 my-4'>
                        <label>Numero de  documento /Factura/ Boleta </label>
                        <input type="number" name='num_documento' onChange={(e) => {manejarInputs(e)}} className="form-control"/>
                    </div>
                    
                </div>
            </div>
            <button  className='btn btn-warning p-3 my-3 right-0' type="submit"> Agregar Venta</button>
        </>
    </form>
    </>
  )
}
