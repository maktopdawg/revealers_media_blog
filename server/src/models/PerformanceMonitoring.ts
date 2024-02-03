import { Schema, model } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const performanceMonitoringSchema = new Schema({
    endpoint: {
        type: String,
        required: true
    },
    responseTime: {
        type: Number,
        required: true
    },
    statusCode: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: String
    },
    // Request IP address
    ipAddress: {
        type: String
    },
    // HTTP method (GET, POST, etc.)
    method: {
        type: String
    },
    // Request headers
    headers: {
        type: Schema.Types.Mixed
    },
    // Query parameters
    queryParams: {
        type: Schema.Types.Mixed
    },
    // Request body (if applicable)
    requestBody: {
        type: Schema.Types.Mixed
    },
});

export default model('PerformanceMonitoring', performanceMonitoringSchema);
