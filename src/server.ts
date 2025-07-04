import express from "express"
import router from "./router"
import db from "./config/db"

// conexion a DB
async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log('Conexion exitosa a la DB')
    }catch( error ){
        console.log( error )
        console.log('Error en la conexión a la base de datos')
    }
}

connectDB()
// Routing
const server = express()

server.use('/api/products', router )


export default server