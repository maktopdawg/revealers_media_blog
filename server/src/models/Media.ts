import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const mediaSchema = new Schema({
    type: {
        type: String,
        enum: ['audio', 'image', 'video', 'gif', 'doc'],
        required: true
    },
    url: {
        type: String,
        required: true
    },
    metadata: {
        type: Schema.Types.Mixed
    },
    uploadedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Media', mediaSchema);
