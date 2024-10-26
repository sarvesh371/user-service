import * as dotenv from "dotenv";
dotenv.config();

const { HOST, USER, DATABASE, PASSWORD, SECRET_ACCESS_TOKEN, SERVER_PORT } = process.env;

export { HOST, USER, DATABASE, PASSWORD, SECRET_ACCESS_TOKEN, SERVER_PORT };

export const SESSION_EXPIRATION: number = Number(process.env.SESSION_EXPIRATION) || 20; // default to 20 if undefined

