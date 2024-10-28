import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../config/index";

import { Request, Response, NextFunction } from "express";

export async function Verify(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers["cookie"]; // get the session cookie from request header

    if (!authHeader) {
      res.status(401).json({
        status: "failed",
        data: [],
        message: "Unauthorized. Please login",
      });
    } else {
      const cookie = authHeader.split("=")[1]; // If there is, split the cookie string to get the actual jwt
      // Verify using jwt to see if token has been tampered with or if it has expired.
      // that's like checking the integrity of the cookie
      if (!SECRET_ACCESS_TOKEN) {
        res.status(500).json({
          status: "failed",
          data: [],
          message: "Internal Server Error: Missing secret access token",
        });
      } else {
        jwt.verify(cookie, SECRET_ACCESS_TOKEN, async (err) => {
          if (err) {
            // if token has been altered or has expired, return an unauthorized error
            return res.status(401).json({
              status: "failed",
              data: [],
              message: "This session has expired. Please login",
            });
          }
          next();
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "failed",
      data: [],
      message: "Internal Server Error",
    });
  }
}
