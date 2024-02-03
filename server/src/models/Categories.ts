import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Category', categorySchema);