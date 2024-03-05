import Comment from "../models/Comment";
import Post from "../models/Post";
import { Request, Response } from "express";

export const AddNewComment = async ( req: Request, res: Response ) => {
    const { content, author } = req.body;
    const { slug } = req.params;

    if (!content || !author || !slug) return res.status(200).json({ "response": "All fields are required." });

    try {
        const findPost = await Post.find({ slug: slug }).exec();
    } catch (error) {
        return res.status(404).json({ "response": "Post Not Found." });
    };

    try {
        const result = await Comment.create({
            "content": content,
            "author": author,
            "post": slug
        });

        return res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({"response": error.message});
    };
};