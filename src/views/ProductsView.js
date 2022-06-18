import React,{useState,useEffect} from 'react'
import Cargando from '../components/Cargando'
import { obtenerProductos } from '../services/productsService'
import { Link } from 'react-router-dom'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';


export default function ProductsView() {
  const [productos,setProducts] = useState([])


  const getProducts = async() =>{
    try {
      const productsObtenidos = await obtenerProductos()
      console.log(productsObtenidos)
      setProducts(productsObtenidos)
    } catch (error) {
      throw error
    }
  }

  useEffect(()=>{
      getProducts()
  },[])

  return (
    <div >
      <h1 className='h1'>
        Productos
      </h1>
      {productos.length>0 ? (
        <div className="row">
        {productos.map(({nom_prod,autor_prod,tipo_prod,cant_prod,img_prod,id},i)=>(
            <div className='col-12 col-md-4 col-lg-3 col-sm-6 g-3   position-relative' key={i} >
              <div className="card bg-dark text-white " >
                  <img src={img_prod} alt={nom_prod} className="card-img" style={{height:"220px" , objectFit:"cover"}}/>
                  <div className="card-img-overlay   " style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
                      <h3 className="card-title"> {nom_prod}</h3>
                      <p className="card-text ">{tipo_prod}</p>
                      <p className='card-text'> <small>{autor_prod}</small></p>
                      <p className='card-text'> Quedan <span className='badge rounded-pill text-bg-warning'>{cant_prod}  </span> </p>

                  </div>
                  <Link to={`/producto/${id}`} className="btn btn-outline-light position-absolute bottom-0 end-0 m-2">
                          Detalles
                  </Link >
              </div>


            </div>
        ))}
        

        
      </div>

      ):(
        <Cargando/>
      )}

        <Link to="/agregarproducto" className="position-fixed bottom-0 end-0  m-3">
          <Fab size="small" color="error" aria-label="add" >
            <AddIcon />
          </Fab>
        </Link>
    </div>
  )
}
