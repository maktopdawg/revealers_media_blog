import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const validatePrice = (value: number) => {
    // Custom validation logic
    console.log(value)
};

const priceValidator = [
    { validator: validatePrice, message: 'Invalid price' }
];

const MerchSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 100
    },
    price: {
        type: Number,
        required: true,
        validate: priceValidator
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        caption: String
    }],
    dateUploaded: {
        type: Date,
        default: Date.now
    },
    sold: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
})

export default model('Merch', MerchSchema)