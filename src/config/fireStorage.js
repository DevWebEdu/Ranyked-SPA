import { storage } from "./firebaseConfig";
import { ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import {v4} from 'uuid'

//creamos una funcion que devuelva una promesa por que subir un archivo demora es una tarea asincrona
//recibimos el archivo a subir
const subirArchivo = (archivo) =>{
   
    return new Promise((resolve,reject)=>{
         //crea,ps ima referencia de donde y con que nombre vamos a guardar el archivo
         //sacamos la extension para guardar correctamente el archivo
        const extension = archivo.type.split("/")[1] 
        const nombreAleatorio= v4()
        const referenciaStorage =ref(storage,`fotos/${nombreAleatorio}.${extension}`)
        //crea,ps ima referencia a la tarea de subida del archivo que se ejecutamediante
        //uploadBytesResumable(refStprage,archivo_que_se_va_subir)
        const tareaSubida=uploadBytesResumable(referenciaStorage,archivo)
        //.on es una especie de listener que va escuchar el evento 'state_changed' con el objetivo de supervisar la subida. si es que hay un error y el fin de la subida mediante  03 callbacks
        tareaSubida.on('state_changed',
            //supervisa la subida del archivo
            ()=>{

            },
            //en caso exista un error
            (err)=>{reject(err)},
            //cuando ya finalizo la subida del archivo
            ()=>{
                getDownloadURL(referenciaStorage)
                .then((url)=>{
                    resolve(url)
                })
            }
        )
    })
}



export{
    subirArchivo
}