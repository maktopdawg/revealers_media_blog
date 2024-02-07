import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MessageSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
        minLength: 50,
        maxLenght: 300
    },
    dateSent: {
        type: Date,
        default: Date.now
    }
})

export default model('Message', MessageSchema)