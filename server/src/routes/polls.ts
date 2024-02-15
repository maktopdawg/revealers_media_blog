// Allow users to create and participate in polls related to blog content. 
// Create routes for creating, updating, deleting, and fetching polls, as well as submitting poll responses.
import { Router } from "express";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { query } from "express-validator";

const router = Router();

router.route('/api/polls')
    .get()