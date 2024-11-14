import * as dotenv from "dotenv";
dotenv.config();

const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT, SECRET_ACCESS_TOKEN, SERVER_PORT, SSL } =
  process.env;

export { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT, SECRET_ACCESS_TOKEN, SERVER_PORT, SSL };

export const SESSION_EXPIRATION: number =
  Number(process.env.SESSION_EXPIRATION) || 120; // default to 120 if undefined
