import { Request, Response } from "express";
import { runQuery } from "../utils/postgres";
import { generateAccessJWT } from "../utils/sessionToken";
import { SESSION_EXPIRATION } from "../config/index";
import bcrypt from "bcrypt";

export async function Signup(req: Request, res: Response): Promise<void> {
  const { userName, fullName, email, password } = req.body;

  try {
    // Check if user already exists by email or username
    const existingUser = await runQuery(
      `SELECT * FROM users WHERE userName = '${userName}' OR email = '${email}'`,
    );
    // Get length of the existing user array
    if (existingUser && existingUser.length > 0) {
      res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you already have an account, please log in instead.",
      });
      return; // Prevent further execution
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Insert new user into the database
      const userData = await runQuery(
        `INSERT INTO users (userName, fullName, email, password) VALUES ('${userName}', '${fullName}', '${email}', '${hashedPassword}') RETURNING *`,
      );
      // Remove password and access token from the userData
      if (userData && userData[0]) {
        delete userData[0].password;
      }
      res.status(201).json({
        status: "success",
        data: [userData],
        message:
          "Thank you for signing up with us. Your account has been successfully created.",
      });
    }
  } catch (err) {
    console.error("Error during user signup:", err);
    res.status(500).json({
      status: "error",
      data: [],
      message: "Internal Server Error",
    });
  }
}

export async function Login(req: Request, res: Response): Promise<void> {
  const { userName, password } = req.body;

  try {
    // Check if user exists by username
    const existingUser = await runQuery(
      `SELECT * FROM users WHERE userName = '${userName}'`,
    );
    // Get length of the existing user array
    if (!existingUser || existingUser.length === 0) {
      res.status(400).json({
        status: "failed",
        data: [],
        message: "It seems you don't have an account, please signup instead.",
      });
      return; // Prevent further execution
    } else {
      // Compare the hashed password with the password in the database
      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser[0].password,
      );
      if (!isPasswordMatch) {
        res.status(401).json({
          status: "failed",
          data: [],
          message:
            "Invalid password. Please try again with the correct password.",
        });
        return; // Prevent further execution
      }
      let options = {
        maxAge: SESSION_EXPIRATION * 1000,
        httpOnly: true, // The cookie is only accessible by the web server
        secure: true,  // Set to true if your website is served over HTTPS
        sameSite: "None",
      };
      const token = await generateAccessJWT(existingUser[0].id); // generate session token for user
      res.cookie("SessionID", token, { ...options, sameSite: "none" }); // set the token to response header, so that the client sends it back on each subsequent request
      res.status(200).json({
        status: "success",
        data: [{
          'userId': existingUser[0].id,
        }],
        message: "You have successfully logged in.",
      });
    }
  } catch (err) {
    console.error("Error during user login:", err);
    res.status(500).json({
      status: "failed",
      data: [],
      message: "Internal Server Error",
    });
  }
}

export async function Logout(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header
    if (!authHeader) {
      res.sendStatus(204); // If there is no cookie, send a no content response.
      return; // Prevent further execution
    } else {
      // Also clear request cookie on client
      res.cookie("SessionID", "", {
        httpOnly: true,
        secure: true,  // Set to true if your website is served over HTTPS
        sameSite: "none",
        expires: new Date(0), // Set to an expired date to force removal
        path: "/", // Ensure the correct path is used
      });
      res.setHeader("Clear-Site-Data", '"cookies"');
      res.status(200).json({
        status: "success",
        data: [],
        message: "You are logged out!",
      });
    }
  } catch (err) {
    console.error("Error during user logout:", err);
    res.status(500).json({
      status: "failed",
      data: [],
      message: "Internal Server Error",
    });
  }
}
