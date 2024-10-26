import * as dotenv from "dotenv";
dotenv.config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

export { HOST, USER, DATABASE, PASSWORD };
