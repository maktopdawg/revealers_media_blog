import { Schema, model } from "mongoose";

const QuizSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    category: {
        type: String,
        required: true,
        enum: ['Personal Development', 'Finance', 'Other']
    },
    questions: [{
        questionText: {
            type: String,
            required: true
        },
        options: [{
            optionText: {
                type: String,
                required: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }]
    }],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    attempts: {
        type: Number,
        default: 0
    },
    passes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Quiz', QuizSchema);
