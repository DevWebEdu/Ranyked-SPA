import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'



export default function VentasView() {
  return (
    <>
    
    <Typography variant ="h5"> Ventas </Typography>
        <Link to="/agregarventa" className="btn btn-success"> Agregar una nueva venta </Link>
    </>
    
  )
}
