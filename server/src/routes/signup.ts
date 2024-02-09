import { Router } from 'express';
import signupController from '../controllers/signupController';

// Create Express Router Instance
const router = Router();

// Route For Handling User Signup Requests
export default router.post('/api/signup', signupController);