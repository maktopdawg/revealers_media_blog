import Category from "../models/Category";
import { Request, Response } from "express";

interface CategoryProps {
    name: string
    description: string
    subcategories: string[]
    createdBy: string
};

export const addNewCategory = async ( req: Request, res: Response ) => {
    const { name, description, subcategories, createdBy }: CategoryProps = req.body;

    if (!name || !description || !subcategories || !createdBy) return res.status(200).json({ "response": "All fields are required." });

    try {
        const result = await Category.create({
            "name": name,
            "description": description,
            "subcategories": subcategories,
            "createdBy": createdBy
        });

        return res.status(201).json(result);

    } catch (error: any) {
        return res.status(500).json({ "response": error.message })
    };
};