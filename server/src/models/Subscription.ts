import { Schema, model, Types } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const SubscriptionSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'User', 
        required: true
    },
    type: {
        type: String,
        enum: ['PREMIUM'], 
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date, 
    autoRenewal: {
        type: Boolean,
        default: true 
    },
    paymentMethod: {
        type: String 
    },
    billingDetails: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        cardNumber: {
            type: String,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true
        },
        cvv: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active'
    }
});

export default model('Subscription', SubscriptionSchema);
