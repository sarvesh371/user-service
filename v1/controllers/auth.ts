import { Request, Response } from "express";
import { runQuery } from "../utils/postgres";
import bcrypt from "bcrypt";

/**
 * @route POST v1/signup
 * @desc Singup a user
 * @access Public
 */

export async function Signup(req: Request, res: Response): Promise<void> {
    const { userName, fullName , email, password } = req.body;

    try {
        // Check if user already exists by email or username
        const existingUser = await runQuery(
            `SELECT * FROM users WHERE userName = '${userName}' OR email = '${email}'`
        );
        // Get length of the existing user array
        if (existingUser && existingUser.length > 0) {
            res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        }
        else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Insert new user into the database
            const userData = await runQuery(
                `INSERT INTO users (userName, fullName, email, password) VALUES ('${userName}', '${fullName}', '${email}', '${hashedPassword}') RETURNING *`
            );
            // Remove password and access token from the userData
            if (userData && userData[0]) {
                delete userData[0].password;
                delete userData[0].accesstoken;
            }
            res.status(201).json({
                status: "success",
                data: [userData],
                message: "Thank you for signing up with us. Your account has been successfully created.",
            });
        }

    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            status: "error",
            data: [],
            message: "Internal Server Error",
        });
    }
}
