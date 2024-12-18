import * as dotenv from "dotenv";
dotenv.config();

// List of required environment variables
const requiredEnvVars = [
  "DB_HOST",
  "DB_USER",
  "DB_DATABASE",
  "DB_PASSWORD",
  "DB_PORT",
  "SECRET_ACCESS_TOKEN",
  "SERVER_PORT",
  "SSL",
];

// Check for missing or empty environment variables
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

// If there are missing or empty variables, throw an error and print them
if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing or empty environment variables: ${missingEnvVars.join(", ")}`
  );
}

const { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT, SECRET_ACCESS_TOKEN, SERVER_PORT, SSL } =
  process.env;

export { DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT, SECRET_ACCESS_TOKEN, SERVER_PORT, SSL };

export const SESSION_EXPIRATION: number =
  Number(process.env.SESSION_EXPIRATION) || 120; // default to 120 if undefined
