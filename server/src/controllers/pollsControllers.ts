import Poll from "../models/Poll";
import { Request, Response } from "express";

interface PollProps {
    questions: Questions[]
    description: string
    expiresAt?: Date
}

interface Questions {
    question: string
    options: string[]
    votes: number
}

export const pollsController = async (req: Request, res: Response) => {
    const { questions, description, expiresAt }: PollProps = req.body;

    if (!questions || !description) return res.status(200).json({ "response": "All fields are required." })

    try {
        const result = await Poll.create({
            "questions": questions,
            "description": description,
        })

        res.status(201).json(result)

    } catch (error: any) {
        res.status(500).json({ "response": error.message })
    }
}