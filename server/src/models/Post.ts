import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        default: 'Revealers Media'
    },
    coverImage: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 50,
        maxlength: 150
    },
    content: [{
        type: {
            type: String,
            enum: ['text', 'image', 'gif', 'audio', 'video', 'doc', 'code'],
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    commentsEnabled: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    claps: {
        type: Number,
        default: 0
    },
    tags: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
    },
    featured: {
        type: Boolean,
        default: false
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    relatedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    }],
})

export default model('Post', PostSchema)
