import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import colors from 'colors';

dotenv.config()

export const db = new Sequelize( process.env.DB_URL , {
    models: [ __dirname + '/../models/**/*.ts' ],
    logging: false
} )

export default db