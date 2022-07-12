import { inputClasses, Typography } from '@mui/material'
import React, { useState,useEffect, useRef } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { editarProducto, obtenerUnProducto } from '../services/productsService'
import { subirArchivo } from '../config/fireStorage'

let miArchivo = null

export default function VerDetalleProductoView() {

    const {idProducto} = useParams()
    const [producto,setProducto] = useState({
        nom_prod:"",
        autor_prod:"",
        tipo_prod:"",
        precio_prod:"",
        cant_prod:"",
        desc_prod:"",
        edicion_prod:""

    })
    const navigate= useNavigate()

    const getProduct  = async()=>{
        try {
            const productoObtenido = await obtenerUnProducto(idProducto)
            setProducto(productoObtenido)
            console.log(producto)
        } catch (error) {
            console.log(`el error es ${error}`)
        }
    }

    const manejarInputs=e=>{
            setProducto({
                ...producto,
                [e.target.name]:e.target.value
            })
    }

    const manejarFile=(e)=>{
        miArchivo=e.target.files[0]

    }
    const inputFile = useRef()
    const manejarSubmit = async(e) => {
        e.preventDefault()
            try{
                if(miArchivo===null){
                    await editarProducto(idProducto,producto)
                    Swal.fire({
                    icon:'info',
                    title:'la edicion se guardo correctamente'})
                    navigate('/productos')
                }else{
                   const archivoSubido = await subirArchivo(miArchivo)
                   await editarProducto(idProducto,{...producto,img_prod:archivoSubido})
                   Swal.fire({
                    icon:'info',
                    title:'la edicion se guardo correctamente'})
                    navigate('/productos')

                }
                
            }catch(error){
                console.log(error)
            }

    }
    useEffect(()=>{
  
      getProduct()
    },[])



  return (
    <form onSubmit={e=>manejarSubmit(e)}>
      
      <div className="card ">         
        <div className="row p-3 d-flex justify-content-around">
            <Typography variant="h4">
            Datos del Producto
            </Typography>
            <div className=" row col-7">
                <div className="card p-2">
                    <div className="mb-3">
                        <label> Nombre del Producto</label>
                        <input type="text" className="form-control" name="nom_prod" value={producto.nom_prod}  onChange={e=>manejarInputs(e)} />
                    </div>
                    <div className="mb-3">
                        <label>Autor/Editor del Producto</label>
                        <input type="text" className="form-control" name="autor_prod" value={producto.autor_prod}  onChange={e=>manejarInputs(e)} />
                    </div>

                    <div className="mb-3">
                        <label>Cantidad</label>
                        <input type="text" className="form-control" name="cant_prod" value={producto.cant_prod}  onChange={e=>manejarInputs(e)} />
                    </div>
                    <div className="mb-3">
                        <label>Edicion</label>
                        <input type="text" className="form-control" name="edicion_prod" value={producto.edicion_prod}  onChange={e=>manejarInputs(e)} />
                    </div>
                    <div className="mb-3">
                        <label>Tipo</label>
                        <input type="text" className="form-control" name="tipo_prod" value={producto.tipo_prod}  onChange={e=>manejarInputs(e)} />
                    </div>
                    <div className="mb-3">
                        <label>Descripcion del producto</label>
                        <input type="text" className="form-control" name="desc_prod" value={producto.desc_prod}  onChange={e=>manejarInputs(e)} />
                    </div>  
                    <div className='mb-3'>
                        <label>Precio</label>
                        <div className="input-group">
                        <input className='form-control' type="number" name='precio_prod' value={producto.precio_prod} onChange={e=>manejarInputs(e)}/>
                        <span className="input-group-text">$</span>
                        </div>
                    </div>       
                </div>
            </div>
            <div className="card col-5">
                <div className="row">
                    <img className="img-fluid  " src={producto.img_prod} />
                    <div className='my-1'>
                    <label className="form-label">
                                    Seleccione Imagen
                                </label>
                    <input type='file' className="form-control" ref={inputFile}  onChange={e=>manejarFile(e)}/>
                </div> 
                </div>
                 
            </div>
        </div>
          

      
      </div>

      <button  className='btn btn-warning p-3 my-3 right-0'  type='submit' >Editar</button>
    </form>
  )
}
