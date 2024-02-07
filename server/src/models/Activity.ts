// Schema for user activity such as handling what user does whilst on app and whom replied etc...
import { Schema, model } from "mongoose";

const ActivitySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    target: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    }
});

export default model('Activity', ActivitySchema);
