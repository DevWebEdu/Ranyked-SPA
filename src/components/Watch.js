import React, {useState,useEffect} from 'react'
import {Box, Typography,styled, Stack, Chip} from '@mui/material'



const BoxWatch  =  styled(Box)(({theme})=>({
    
}))

const TypographySpan= styled(Typography)(({theme})=>({
    padding:"10px",
    backgroundColor:"rgba(184, 96, 52,0.858)",
    color:"white",
    borderRadius:"5px",
    fontSize:"300%",
    [theme.breakpoints.down("md")]:{
        fontSize:"200%",
    }
}))

const ContainTime= styled("div")(({theme})=>({
    display:"flex",
    flexDirection:"column",
    alignItems:"center",

}))
const Point= styled("div")(({theme})=>({
    
    padding:"20px",
    fontSize:"2em",
    fontFamily:"monospace",
    [theme.breakpoints.down("md")]:{
        padding:"10px",
    }

}))


export default function Watch() {
       
    //useState obj Fecha
    const [fecha,setFecha] = useState({
        daysNumber:null,
        dayName:"",
        monthName:"",
        yearNumber:null,
        hoursNum:null,
        minutes:null,
        seconds:null
   })

   
//    console.log(fecha)
    useEffect(()=>{
        const actualizarFecha  = () => {
            const fechaActual= new Date()
            // console.log(fechaActual)
            const days= ["Lunes", "Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
            const months = ["Enero","Febrero","Marzo","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
            //fecha
            const numDay= fechaActual.getDate()
            const nameDay=days[fechaActual.getDay()]
            const monthName= months[fechaActual.getMonth()]
            const yearNum = fechaActual.getFullYear()
            //Reloj
            const hours= fechaActual.getHours()
            const mins= fechaActual.getMinutes()
            const secs= fechaActual.getSeconds()           

            setFecha({
                daysNumber:numDay,
                dayName:nameDay,
                monthName:monthName,
                yearNumber:yearNum,
                hoursNum:hours,
                minutes:mins,
                seconds:secs})
            
            

            }
        actualizarFecha()
        setInterval(actualizarFecha,1000)
    },[])
   return (
    <BoxWatch className='bg-success text-center '>
        
        <Stack  direction="row" spacing={.1} sx={{padding:"20px",backgroundColor:"white",display:"flex", justifyContent:"center",width:"100%"}}>

            {/* un if ternario para validar la hora seteada */}
            <ContainTime>
            <TypographySpan variant="span">{fecha.hoursNum<10?"0"+fecha.hoursNum:fecha.hoursNum }</TypographySpan>
            <Chip sx={{marginTop:"10px"}} label="Horas" />
            </ContainTime>
            <Point> <span style = {{ fontWeight:"bolder"}}>:</span> </Point>
            <ContainTime>
            <TypographySpan variant="span">{fecha.minutes<10?"0"+fecha.minutes:fecha.minutes}</TypographySpan>
            <Chip sx={{marginTop:"10px"}} label="Minutos" />
            </ContainTime>
            <Point> <span style = {{ fontWeight:"bolder"}}>:</span> </Point>
            <ContainTime>
            <TypographySpan variant="span">{fecha.seconds<10?"0"+fecha.seconds:fecha.seconds}</TypographySpan>
            <Chip sx={{marginTop:"10px"}} label="Segundos" />
            {/* <Typography variant="span" >{fecha.hoursNum<12?" AM":" PM"}</Typography> */}
            </ContainTime>
            
        </Stack>
       

    </BoxWatch>
  )
}
