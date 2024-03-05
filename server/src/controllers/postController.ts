import Post from "../models/Post";
import Category from "../models/Category";
import { Request, Response } from "express";

export const createNewPost = async ( req: Request, res: Response ) => {
    const { title, author, coverImage, description, content, slug, category } = req.body;

    if (!title || !author || !coverImage || !description || !content || !slug || !category) return res.status(200).json({ "response": "All fields are required." });
    
    try {
        const findCategory = await Category.findById(category).exec();

    } catch (error) {
        return res.status(404).json({ "response": "Invalid Category" })
    };

    try {
        const result = await Post.create({
            "title": title,
            "author": author,
            "coverImage": coverImage,
            "description": description,
            "content": content,
            "slug": slug,
            "category": category
        });

        return res.status(201).json(result);
    } catch (error: any) {
        return res.status(500).json({ "response": error.message });
    };
};


export const getAllPosts = async ( req: Request, res: Response ) => {
    const posts = await Post.find();

    if (!posts || posts.length == 0) {
        return res.status(204).json({ "response": "No posts found" });
    };

    return res.json(posts);
};

