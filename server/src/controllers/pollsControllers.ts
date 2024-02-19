import Poll from "../models/Poll";
import { Request, Response } from "express";

interface PollProps {
    questions: Questions[]
    description: string
    expiresAt?: Date
    createdBy: string
    catergory: string
};

interface Questions {
    question: string
    options: string[]
};


export const createPollController = async (req: Request, res: Response) => {
    const { questions, description, createdBy, catergory, expiresAt }: PollProps = req.body;

    if (!questions || !description || !createdBy || !catergory ) return res.status(200).json({ "response": "All fields are required." });

    try {
        const result = await Poll.create({
            "questions": questions,
            "description": description,
            "createdBy": createdBy,
            "catergory": catergory
        });

        res.status(201).json(result);

    } catch (error: any) {
        res.status(500).json({ "response": error.message });
    };
};


export const getAllPollsController = async (req: Request, res: Response) => {
    const polls = await Poll.find();
    if (!polls) return res.status(204).json({ "response": "No polls found." })
    res.json(polls)
};


// Change all routes to use query strings
export const deletePollController = async (req: Request, res: Response) => {
    try {
        if (!req.params.id) return res.status(400).json({ response: "Poll ID is required" });
        
        const id = req.params.id;
        const poll = await Poll.findOne({ _id: id }).exec();
        
        if (!poll) {
            return res.status(404).json({ message: `Poll ID ${id} not found.` });
        }
        
        const result = await poll.deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: 'Internal Server Error' }); // Send a generic error response
    }
};
