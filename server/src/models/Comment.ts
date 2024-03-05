import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true,
        max: 150
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    CreatedAt: {
        type: Date, 
        default: Date.now
    },
    ThumbsUp: {
        type: Number,
        default: 0
    },
    ThumbsDown: {
        type: Number,
        default: 0
    }
})

export default model('Comment', CommentSchema)