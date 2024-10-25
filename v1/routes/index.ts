import { Application, Request, Response } from 'express';

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
                status: "error",
                message: "Internal Server Error",
            });
        }
    })
    };
export default Router;
