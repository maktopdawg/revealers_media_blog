import User from "../models/User"
import bcrypt from "bcrypt"
import { Request, Response } from "express";

interface SignupProps {
    name: string
    username: string
    email: string
    password: string
}

/**
 * Handles user signup by creating a new account in the database.
 * 
 * @param req The Express request object containing user data in the body.
 * @param res The Express response object used to send HTTP responses.
 * @returns A JSON response indicating success or failure of the signup process.
 */
const signupController = async (req: Request, res: Response) => {
    const { name, email, username, password }: SignupProps = req.body;

    if (!name || !username || !email || !password) return res.status(200).json({ "response": "All fields are required." });

    // Check For Duplicates Usernames In Database
    const duplicate = await User.findOne({ username: username }).exec();

    if (duplicate) return res.status(409).json({ "message": "Username must be unique." }); // Conflict

    try {
        // Encrypt The Password
        const hashedPassword: string = await bcrypt.hash(password, 10)

        // Create And Store Account To Database
        const result = await User.create({
            "name": name,
            "username": username,
            "email": email,
            "password": hashedPassword
        })

        res.status(201).json({ "success": `${username} has joined the movement!` })

    } catch (error: any) {
        res.status(500).json({ "response": error.message })
    }
}

export default signupController
