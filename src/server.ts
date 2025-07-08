import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import swaggerUi , { SwaggerUiOptions } from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"

// conexion a DB
export async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.yellow.bold('Conexion exitosa a la DB'))
    }catch( error ){
        console.log(colors.red.bold('Error en la conexión a la base de datos'))
    }
}
connectDB()

// instancia de express
const server = express()

// leer json
server.use( express.json() )

server.use('/api/products', router )

// Docs
server.use( '/docs' , swaggerUi.serve , swaggerUi.setup( swaggerSpec , swaggerUiOptions ) )

/*
server.get( '/api' , ( req , res ) => {
    res.json( { msg : 'Desde API' } )
} )
 */

export default server