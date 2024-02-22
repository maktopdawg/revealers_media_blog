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


/**
 * Controller function to create a new poll.
 * @param req Express Request object containing poll data in the request body.
 * @param res Express Response object used to send the response.
 * @returns Returns a JSON response indicating success or failure.
 */
export const createPollController = async (req: Request, res: Response) => {
    // Destructuring poll properties from request body
    const { questions, description, createdBy, catergory, expiresAt }: PollProps = req.body;

    // Checking if all required fields are provided
    if (!questions || !description || !createdBy || !catergory ) {
        return res.status(200).json({ "response": "All fields are required." });
    }

    try {
        // Creating a new poll in the database
        const result = await Poll.create({
            "questions": questions,
            "description": description,
            "createdBy": createdBy,
            "catergory": catergory
        });

        // Sending a success response with the created poll data
        res.status(201).json(result);
    } catch (error: any) {
        // Handling any errors that occur during poll creation
        res.status(500).json({ "response": error.message });
    };
};


/**
 * Controller function to retrieve all polls.
 * @param req Express Request object (unused in this function).
 * @param res Express Response object used to send the response.
 * @returns Returns a JSON response containing all polls if found, or a message indicating no polls found.
 */
export const getAllPollsController = async (req: Request, res: Response) => {
    // Retrieving all polls from the database
    const polls = await Poll.find();

    // Checking if any polls were found
    if (!polls || polls.length === 0) {
        // Sending a response indicating no polls were found
        return res.status(204).json({ "response": "No polls found." });
    }

    // Sending a response containing all retrieved polls
    res.json(polls);
};


/**
 * Controller function to delete a poll by its ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the operation.
 */
export const deletePollController = async (req: Request, res: Response) => {
    // Check if poll ID is provided in the request body
    if (!req.body.id) return res.status(400).json({ "response": "Poll ID is required." });

    const id = req.body.id;

    try {
        // Attempt to find and delete the poll by its ID
        const poll = await Poll.findOneAndDelete({ _id: id });

        // If the poll is not found, return 404 error
        if (!poll) {
            return res.status(404).json({ message: `Poll ID ${id} not found.` });
        }

        // If the poll is successfully deleted, return success response
        return res.json({ "response": `Poll ID ${id} deleted successfully` });
    } catch (error) {
        // If an error occurs during the deletion process, return 404 error
        return res.status(404).json({ "response": `Poll ID ${id} not found` });
    };
};


/**
 * Controller function to retrieve a poll by its ID.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Promise representing the completion of the operation.
 */
export const getPollById = async (req: Request, res: Response) => {
    // Check if poll ID is provided in the request parameters
    if (!req?.params?.id) return res.status(400).json({ "response": "Poll parameter is required." });

    const id = req.params.id;

    try {
        // Attempt to find the poll by its ID
        const poll = await Poll.findOne({ _id: id }).exec();

        // If the poll is found, return it in the response
        return res.json(poll);
    } catch (error) {
        // If an error occurs during the retrieval process, return 404 error
        return res.status(404).json({ "response": `Poll with ID ${id} not found.` });
    };
};


/**
 * Controller function to add a vote to a poll option by its index.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const addVote = async (req: Request, res: Response) => {
    // Check if poll ID and vote index are provided in the request parameters and body
    if (!req?.params?.id || !req?.body?.index) return res.status(400).json({ "response": "All fields are required." });

    const pollId = req.params.id;
    const index = req.body.index;

    try {
        // Attempt to find the poll by its ID
        try {
            const poll = await Poll.findOne({ _id: pollId }).exec();
            if (!poll) {
                return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
            };
        } catch (error) {
            return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
        }

        // Increase the vote count for the specified option index
        try {
            const poll = await Poll.findOne({ _id: pollId }).exec();
            if (!poll) {
                return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
            };
            poll.questions[index].vote += 1;
            const result = await poll.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ "response": `Index Not Valid` });
        }
        
    } catch (error) {
        // If an error occurs during the process, return 404 error
        return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
    };
};


/**
 * Controller function to remove a vote from a poll option by its index.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const removeVote = async (req: Request, res: Response) => {
    // Check if poll ID and vote index are provided in the request parameters and body
    if (!req?.params?.id || !req?.body?.index) return res.status(400).json({ "response": "All fields are required." });

    const id = req.params.id;
    const index = req.body.index;

    try {
        // Attempt to find the poll by its ID
        try {
            const poll = await Poll.findOne({ _id: id }).exec();
            if (!poll) {
                return res.status(404).json({ "response": `Poll with ID ${id} not found.` });
            };
        } catch (error) {
            return res.status(404).json({ "response": `Poll with ID ${id} not found.` });
        }

        // Decrease the vote count for the specified option index
        try {
            const poll = await Poll.findOne({ _id: id }).exec();
            if (!poll) {
                return res.status(404).json({ "response": `Poll with ID ${id} not found.` });
            };
            if (poll.questions[index].vote && poll.questions[index].vote > 0) {
                poll.questions[index].vote -= 1;
                const result = await poll.save();
                return res.status(200).json(result);
            } else {
                return res.status(400).json({ "response": "Vote count is already zero." });
            };
        } catch (error) {
            return res.status(404).json({ "response": `Index Not Valid` });
        }
    
    } catch (error) {
        console.error("Error removing vote:", error);
        return res.status(500).json({ "response": "Internal server error." });
    };
};


/**
 * Controller function to like a poll by a user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const likePoll = async (req: Request, res: Response) => {
    // Check if poll ID and user ID are provided in the request parameters and body
    if (!req?.params?.id || !req?.body?.id) {
        return res.status(400).json({ "response": "All fields are required." });
    }
    
    const pollId = req.params.id; // Poll's ID
    const userId = req.body.id; // User's ID to show they liked

    try {
        // Find the poll by its ID
        const poll = await Poll.findOne({ _id: pollId }).exec();
        if (!poll) {
            return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
        };

        // Check if user's ID is already in dislikedUsers array
        const dislikedIndex = poll.dislikedUsers.indexOf(userId);
        if (dislikedIndex !== -1) {
            // Remove user's ID from dislikedUsers
            poll.dislikedUsers.splice(dislikedIndex, 1);

            // Add user's ID to likedUsers
            poll.likedUsers.push(userId);

            // Increment likes and decrement dislikes
            poll.likes += 1;
            poll.dislikes -= 1;
        } else if (!poll.likedUsers.includes(userId)) {
            // If user's ID is not in likedUsers or dislikedUsers, add it to likedUsers
            poll.likedUsers.push(userId);
            poll.likes += 1;
        };

        const result = await poll.save();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error liking poll:", error);
        return res.status(500).json({ "response": "Internal server error." });
    };
};


/**
 * Controller function to dislike a poll by a user.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const dislikePoll = async (req: Request, res: Response) => {
    // Check if poll ID and user ID are provided in the request parameters and body
    if (!req?.params?.id || !req?.body?.id) {
        return res.status(400).json({ "response": "All fields are required." });
    }
    
    const pollId = req.params.id; // Poll's ID
    const userId = req.body.id; // User's ID to show they disliked

    try {
        // Find the poll by its ID
        const poll = await Poll.findOne({ _id: pollId }).exec();
        if (!poll) {
            return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
        }

        // Check if user's ID is already in likedUsers array
        const likedIndex = poll.likedUsers.indexOf(userId);
        if (likedIndex !== -1) {
            // Remove user's ID from likedUsers
            poll.likedUsers.splice(likedIndex, 1);

            // Add user's ID to dislikedUsers
            poll.dislikedUsers.push(userId);

            // Increment dislikes and decrement likes
            poll.dislikes += 1;
            poll.likes -= 1;
        } else if (!poll.dislikedUsers.includes(userId)) {
            // If user's ID is not in likedUsers or dislikedUsers, add it to dislikedUsers
            poll.dislikedUsers.push(userId);
            poll.dislikes += 1;
        }

        const result = await poll.save();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error disliking poll:", error);
        return res.status(500).json({ "response": "Internal server error." });
    }
};


/**
 * Controller function to undo like/dislike action by a user on a poll.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
export const undoLikeDislikePoll = async (req: Request, res: Response) => {
    // Check if poll ID and user ID are provided in the request parameters and body
    if (!req?.params?.id || !req?.body?.id) {
        return res.status(400).json({ "response": "All fields are required." });
    };
    
    const pollId = req.params.id; // Poll's ID
    const userId = req.body.id; // User's ID

    try {
        // Find the poll by its ID
        const poll = await Poll.findOne({ _id: pollId }).exec();
        if (!poll) {
            return res.status(404).json({ "response": `Poll with ID ${pollId} not found.` });
        };

        // Check if user's ID is in likedUsers array
        const likedIndex = poll.likedUsers.indexOf(userId);
        if (likedIndex !== -1) {
            // Remove user's ID from likedUsers and decrement likes count
            poll.likedUsers.splice(likedIndex, 1);
            poll.likes -= 1;
        };

        // Check if user's ID is in dislikedUsers array
        const dislikedIndex = poll.dislikedUsers.indexOf(userId);
        if (dislikedIndex !== -1) {
            // Remove user's ID from dislikedUsers and decrement dislikes count
            poll.dislikedUsers.splice(dislikedIndex, 1);
            poll.dislikes -= 1;
        };

        const result = await poll.save();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error undoing like/dislike for poll:", error);
        return res.status(500).json({ "response": "Internal server error." });
    };
};
