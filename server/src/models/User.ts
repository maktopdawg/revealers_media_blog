import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: "http://default_img.jpg"
    },
    roles: {
        User: {
            type: Number,
            default: 1458
        },
        Admin: Number,
        Editor: Number,
        Author: Number,
        Moderator: Number,
        Contributor: Number,
        Viewer: Number
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscription: {
        type: {
            type: String,
            enum: ['BASIC', 'NEWSLETTER', 'PREMIUM'],
            default: 'BASIC'
        },
        newsletterSubscription: {
            type: Boolean,
            default: false
        },
        premiumSubscription: {
            type: Boolean,
            default: false
        }
    },
    preferences: {
        darkMode: {
            type: Boolean,
            default: false,
        },
    },
    refreshToken: String,
    location: String,
});

export default model('User', userSchema);