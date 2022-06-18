import axios from 'axios'

const URL= 'https://627c4e0ce5ac2c452aee44e9.mockapi.io'

const obtenerProductos= async () =>{
    try {
       const {data,status} = await axios.get(`${URL}/productos`)
        if(status===200) return data
        throw Error
    } catch (error) {
        console.log(`EL ERROR ES ${error}`) 
    }
}

const crearProducto = async(nuevoProducto) =>{
    try {
        const headers = {
            "Content-Type" : "application/json"
        }
        const {data,status} = await axios.post(`${URL}/productos`,nuevoProducto,{headers})
        if(status===201){
            return data
        }else {
            throw Error
        }
    } catch (error) {
        console.log(`EL ERROR ES ${error}`) 
    }
}

const obtenerUnProducto= async (idProducto) => {
    try {
        const  endPoint=`${URL}/productos/${idProducto}`
        const {data,status} = await axios.get(endPoint)
        if(status===200) return data
        throw Error("error al encontrar al Cliente")
    }catch(error){
        console.log(`EL ERROR ES ${error}`) 
    }
}

export {obtenerProductos,crearProducto,obtenerUnProducto}