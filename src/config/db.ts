import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";
configDotenv();

const db = new Sequelize( process.env.DB_URL )

export default db