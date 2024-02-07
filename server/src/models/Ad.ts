import { Schema, model } from "mongoose";

const AdSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    },
    imageURL: {
        type: String,
        required: true
    },
    advertiser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    views: {
        type: Number,
        default: 0
    },
    clicks: {
        type: Number,
        default: 0
    }
});

export default model('Ad', AdSchema);
