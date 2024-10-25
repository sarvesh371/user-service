import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, URI } from "./config/index";
import Router from "./routes/index";

// === 1 - CREATE SERVER ===
const server = express();

// CONFIGURE HEADER INFORMATION
// Allow request from any source. In real production, this should be limited to allowed origins only
server.use(cors());
server.disable("x-powered-by"); //Reduce fingerprinting
server.use(cookieParser());
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

// === 2 - CONNECT DATABASE ===


// === 4 - CONFIGURE ROUTES ===
// Connect Route handler to server
Router(server);

// === 5 - START UP SERVER ===
server.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
