import express from "express"
import router from "./router"
import db from "./config/db"
import colors from "colors"
import cors , { CorsOptions } from "cors"
import swaggerUi , { SwaggerUiOptions } from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger"
import morgan from "morgan"

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

// permitir conexiones CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTEND_URL || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    } 
}


server.use( cors( corsOptions) )

// leer json
server.use( express.json() )

server.use( morgan('dev') )
server.use('/api/products', router )

// Docs
server.use( '/docs' , swaggerUi.serve , swaggerUi.setup( swaggerSpec , swaggerUiOptions ) )

/*
server.get( '/api' , ( req , res ) => {
    res.json( { msg : 'Desde API' } )
} )
 */

export default server