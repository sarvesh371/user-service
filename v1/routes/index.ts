import { Application, Request, Response } from "express";
import { Signup, Login, Logout } from "../controllers/auth";
import { Verify } from "../middleware/verify";

const Router = (server: Application) => {
  // home route with the get method and a handler
  server.get("/v1", (req: Request, res: Response) => {
    try {
      res.status(200).json({
        status: "success",
        data: [],
        message: "Welcome to our API homepage!",
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        data: [],
        message: "Internal Server Error",
      });
    }
  });
  server.post("/v1/signup", Signup);
  server.post("/v1/login", Login);
  server.get("/v1/logout", Logout);
  server.get("/v1/user", Verify, (req, res) => {
    res.status(200).json({});
  });
};
export default Router;
