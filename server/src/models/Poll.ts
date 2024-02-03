import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const PollSchema = new Schema({
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: [{
            type: String,
            required: true
        }],
        votes: {
            type: Number,
            default: 0
        }
    }],
    description: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: null
    }
})

export default model('Poll', PollSchema)