import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import colors from 'colors';

dotenv.config()

console.log( colors.gray.bold( process.env.DB_URL ) );


const db = new Sequelize( process.env.DB_URL , {
    models: [ __dirname + '/../models/**/*.ts' ]
} )

export default db