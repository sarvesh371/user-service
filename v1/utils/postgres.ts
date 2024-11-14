// src/db.ts
import { Client } from "pg";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE, SSL } from "../config/index";

export async function runQuery(queryText: string) {
  // Initialize the client with database configuration
  const dbConfig = {
    user: DB_USER,
    host: DB_HOST, // Or your database server's IP
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: parseInt(DB_PORT || "5432"), // Default to 5432 if PORT is undefined
    ssl: SSL === 'true' ? true : SSL === 'false' ? false : undefined
  };

  const client = new Client(dbConfig);

  try {
    // Connect to the PostgreSQL database
    await client.connect();

    // Example query
    const res = await client.query(queryText);

    // Return the result
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
  } finally {
    // Close the connection
    await client.end();
  }
}
