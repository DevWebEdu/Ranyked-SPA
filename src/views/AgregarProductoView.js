import { Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { subirArchivo } from '../config/fireStorage'
import { crearProducto } from '../services/productsService'


let miArchivo=null

export default function AgregarProductoView() {

    const tipoProductos =  ["Seminario","Libro","Suscripcion"]

    const [producto,setProducto]= useState({
        nom_prod:"",
        autor_prod:"",
        tipo_prod:"",
        precio_prod:"",
        cant_prod:"",
        desc_prod:"",
        edicion_prod:""
    })
     
    const inputFile = useRef()

    const manejarInput = (e) => {
        console.log(e)
        setProducto({
          ...producto,
          [e.target.name]:e.target.value
        })
      }
    const manejarFile=(e)=>{
        miArchivo=e.target.files[0]
    }
    const navigate= useNavigate()
    const manejarSubmit = async(e) =>{
        e.preventDefault()
        try{
            const archivoSubido = await subirArchivo(miArchivo)
            await crearProducto({...producto,img_prod:archivoSubido})
            Swal.fire({
                icon:"success",
                title:"Producto Creado"
            })
            navigate("/productos")
        }catch(error){
            console.log(error)
        }
    }

    

   

  return (
    <div >
        
        <Typography variant='h3' >
            Agregar Producto
        </Typography>

        <form className='my-3' onSubmit={(e)=>{manejarSubmit(e)}}>
            <Typography variant="h6">Datos del Producto</Typography>
            <div className='card my-1'>
                <div className='row py-4 px-2'>
                    <div className='col-xs-12 col-lg-3 mb-3'>
                        <label >Nombre del Producto</label>
                        <input className='form-control' type="text" onChange={e=>manejarInput(e)} name='nom_prod' value={producto.nom_prod}/>
                    </div>
                    <div className='col-xs-12 col-lg-3 mb-3'>
                        <label>Autor/Editor del Producto</label>
                        <input className='form-control' type="text" name='autor_prod' onChange={e=>manejarInput(e)} value={producto.autor_prod}/>
                    </div>
                    <div className='col-xs-3 col-lg-1 mb-3'>
                        <label>Cantidad</label>
                        <input className='form-control' type="number" name='cant_prod' onChange={e=>manejarInput(e)} value={producto.cant_prod}/>
                    </div>
                    <div className='col-xs-12 col-lg-3 mb-3'>
                        <label>Edicion</label>
                        <input className='form-control' type="text" name='edicion_prod' onChange={e=>manejarInput(e)} value={producto.edicion_prod}/>
                    </div>
                    <div className='col-xs-6 col-lg-2 mb-3'>
                        <label>Tipo</label>
                        <select
                        className='form-select'
                        name='tipo_prod'
                        value={producto.tipo_prod}
                        onChange={e=>manejarInput(e)}
                        >
                        {tipoProductos.map((tipo,i)=>(
                            <option value={tipo} key={i}>
                                {tipo}
                            </option>
                        ))}
                        </select>
                    </div>

                    <div className=" mb-3 col-12">
                        <label >Descripcion del producto</label>
                        <textarea className="form-control" rows={3} placeholder="Producto que consta de..." name="desc_prod" style={{maxHeight: "200px"}} onChange={(e) => {manejarInput(e)}}  value={producto.desc_prod}></textarea>
                                            
                    </div>
                    <div className="mb-3">
                            <label className="form-label">
                                Seleccione Imagen
                            </label>
                            <input type='file' className="form-control" ref={inputFile} onChange={(e)=>manejarFile(e)}/>            
                    </div>
                    <div className=' col-xs-6 col-lg-3 mb-3'>
                        <label>Precio</label>
                        <div className="input-group">
                        <input className='form-control' type="number" name='precio_prod' onChange={e=>manejarInput(e)} value={producto.precio_prod}/>
                        <span className="input-group-text">$</span>
                        </div>
                    </div>
                </div>
                    
            </div>
            <button className='btn btn-warning p-3 my-3 right-0' type="submit" >Crear Producto</button>             
             
        </form>


    </div>
  )
}
