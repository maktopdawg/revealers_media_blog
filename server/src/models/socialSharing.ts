import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const SocialSharingSchema = new Schema ({
    platform: {
        type: String,
        enum: ['Facebook', 'X', 'Instagram', 'LinkedIn', 'Pinterest', 'WhatsApp'],
        required: true
    },
    shareCount: {
        type: Number,
        default: 0
    },
    lastShared: {
        type: Date,
        default: null
    },
    postTitle: {
        type: String,
        required: true
    },
    postImage: {
        type: String,
        required: true
    },
    postUrl: {
        type: String,
        required: true
    }
})

export default model('Social Sharing', SocialSharingSchema)