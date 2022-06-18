import axios from 'axios'


const URL = 'https://627c4e0ce5ac2c452aee44e9.mockapi.io'


const obtenerClientes= async () =>{
    try {
        const{data,status}=await axios.get(`${URL}/clientes`)
        if(status===200){
            
            return data
        }else{
            throw Error
        }
    } catch (error) {
        console.log(`EL ERROR ES ${error}`) 
    }
}


const crearCliente = async(nuevoCliente) =>{
    try {
        const headers = {
            "Content-Type" : "application/json"
        }
        const {data,status} = await axios.post(`${URL}/clientes`,nuevoCliente,{headers})
        if(status===201){
            return data
        }else {
            throw Error
        }
    } catch (error) {
        console.log(`EL ERROR ES ${error}`) 
    }
}

const eliminarCliente  = async (idCliente) =>{
    try {
        const endPoint= `${URL}/clientes/${idCliente}`
        const {status} = await axios.delete(endPoint)
        if(status===200){
            return "ok"
        }else{
            return Error("ocurrio un error")
        }
    } catch (error) {
        return error
    }
}

const obtenerUnCliente= async (idCliente) => {
    try {
        const  endPoint=`${URL}/clientes/${idCliente}`
        const {data,status} = await axios.get(endPoint)
        if(status===200) return data
        throw Error("error al encontrar al Cliente")
    }catch(error){
        console.log(`EL ERROR ES ${error}`) 
    }
}

const editarCliente = async ( idCliente,clienteAEditar)=>{
    try{
        const headers = {
            "Content-Type" :"application/json"
        }
        const endPoint = `${URL}/clientes/${idCliente}`
        const {data,status} = await axios.put(endPoint,clienteAEditar,{headers})
        if(status===200){
            return data
        }else{
            throw Error("erro")
        }

    } catch(error){
        console.log(error)
    }
}


export {
    obtenerClientes,
    crearCliente,
    eliminarCliente,
    obtenerUnCliente, 
    editarCliente
}