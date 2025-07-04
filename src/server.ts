import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"

// conexion a DB
async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.yellow.bold('Conexion exitosa a la DB'))
    }catch( error ){
        console.log( error )
        console.log(colors.red.bold('Error en la conexión a la base de datos'))
    }
}

connectDB()
// Routing
const server = express()

server.use('/api/products', router )


export default server