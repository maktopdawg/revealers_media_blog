import { Router } from "express";
import { body, param } from "express-validator";
import verifyRoles from "../middleware/verifyRoles";
import ROLES from "../config/roles";
import { 
    createPollController, 
    getAllPollsController, 
    deletePollController, 
    getPollById, 
    addVote, 
    removeVote, 
    likePoll, 
    dislikePoll, 
    undoLikeDislikePoll
} from "../controllers/pollsControllers";

const router = Router();

router.route('/api/polls')
    .post(
        body('title').notEmpty().withMessage('Title is required.'),
        body('options').isArray({ min: 2 }).withMessage('At least two options are required.'),
        createPollController
    )
    .get(getAllPollsController)
    .delete(deletePollController);

router.route('/api/polls/:id')
    .get(
        param('id').notEmpty().withMessage('Poll ID is required.'),
        getPollById
    );

router.patch('/api/polls/:id/like', likePoll);
router.patch('/api/polls/:id/dislike', dislikePoll);

router.patch('/api/polls/:id/add-vote', addVote);
router.patch('/api/polls/:id/remove-vote', removeVote);

router.patch('/api/polls/:id/remove-like-and-dislike', undoLikeDislikePoll);

export default router;
