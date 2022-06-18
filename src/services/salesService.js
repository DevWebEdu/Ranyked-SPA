import axios from 'axios'


const URL = "https://627c4e0ce5ac2c452aee44e9.mockapi.io"

const obtenerVentas = async()=>{
    try {
        const {status,data} = await axios.get (`${URL}/Ventas`)
        if ( status === 200) return data
        throw Error("error")
    } catch (error) {
        console.log(error)
    }
}

const crearVenta= async(nuevoVentas) =>{
    try {
        const headers = {
            "Content-Type" : "application/json"
        }
        const {data,status} = await axios.post(`${URL}/Ventas`,nuevoVentas,{headers})
        if(status===201){
            return data
        }else {
            throw Error
        }
    } catch (error) {
        console.log(`EL ERROR ES ${error}`) 
    }
}


export{
    obtenerVentas,
    crearVenta
}