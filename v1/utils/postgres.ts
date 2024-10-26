// src/db.ts
import { Client } from 'pg';
import { HOST, USER, PASSWORD, DATABASE } from "../config/index";

export async function runQuery(queryText: string) {
  // Initialize the client with database configuration
    const dbConfig = {
        user: USER,
        host: HOST,      // Or your database server's IP
        database: DATABASE,
        password: PASSWORD,
        port: 5432,
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
    console.error('Database query error:', error);
  } finally {
    // Close the connection
    await client.end();
  }
}
