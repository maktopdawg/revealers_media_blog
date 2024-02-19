import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const PollSchema = new Schema({
    questions: {
        type: [{
            question: {
                type: String,
                required: true
            },
            options: {
                type: [{
                    type: String,
                    required: true
                }],
                validate: {
                    validator: (options: string[]) => {
                        return options.length <= 10;
                    },
                    message: "Options array must contain at most ten elements."
                }
            },
            vote: {
                type: Number,
                default: null
            }
        }],
        validate: {
            validator: (q: string[]) => {
                return q.length <= 5;
            }
        }
    },
    description: {
        type: String,
        required: true
    },
    catergory: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
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
        // Calculate expiration date 30 days from current date
        default: () => {
            return new Date((Date.now()) + 30 * 24 * 60 * 60 * 1000);
        },
    }
})

export default model('Poll', PollSchema)