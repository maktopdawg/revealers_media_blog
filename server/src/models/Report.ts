import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const ReportingSchema = new Schema({
    reportType: {
        type: String,
        enum: ['Bug', 'Feature Request', 'User Feedback', 'Complaint', 'Other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reportedBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        default: 'Open'
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    resolvedAt: {
        type: Date,
        default: null
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

export default model('Report', ReportingSchema)