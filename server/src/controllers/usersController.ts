import { Request, Response } from "express";
import User from "../models/User";

/**
 * Retrieves all users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'response': 'No users found' });
    res.json(users);
}


/**
 * Retrieves Admin users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users with the specified role.
 */
export const getAllAdminUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ "roles.Admin": { $exists: true } });
        if (!users) return res.status(204).json({ 'response': 'No users found.' });
        res.json({users});
    } catch (err) {
        console.error("Error fecthing users by role:", err)
        res.status(500).json({ 'response': 'An internal server error has occured.' });
    }
}


/**
 * Retrieves Editor users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users with the specified role.
 */
export const getAllEditorUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ "roles.Editor": { $exists: true } });
        if (!users) return res.status(204).json({ 'response': 'No users found.' });
        res.json({users});
    } catch (err) {
        console.error("Error fecthing users by role:", err);
        res.status(500).json({ 'response': 'An internal server error has occured.' });
    }
}


/**
 * Retrieves Author users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users with the specified role.
 */
export const getAllAuthorUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({ "roles.Author": { $exists: true } });
        if (!users) return res.status(204).json({ 'response': 'No users found.' });
        res.json({users});
    } catch (err) {
        console.error("Error fecthing users by role:", err);
        res.status(500).json({ 'response': 'An internal server error has occured.' });
    }
}


/**
 * Retrieves all verified users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of verified users.
 */
export const getAllVerifiedUsers = async (req: Request, res: Response) => {
    const users = await User.find({ isVerified: true });
    if (!users) return res.status(204).json({ 'response': 'No users found' });
    res.json(users);
}


/**
 * Retrieves all unverified users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of unverified users.
 */
export const getAllUnverifiedUsers = async (req: Request, res: Response) => {
    const users = await User.find({ isVerified: false });
    if (!users) return res.status(204).json({ 'response': 'No users found' });
    res.json(users);
}


/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req - The request object containing the user ID in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the result of the deletion operation.
 */
export const deleteUser = async (req: Request, res: Response) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID is required' });
    const id = req.body.id;
    const user = await User.findOne({ __id: id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${id}` });
    };
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}


/**
 * Retrieves users subscribed to the newsletter from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users subscribed to the newsletter.
 */
export const getNewsletterSubscribedUsers = async (req: Request, res: Response) => {
    const users = await User.find({ "subscription.newsletterSubscription": true });
    if (!users) return res.status(204).json({ 'response': 'No user has subscribed to the newsletter subscription.' });
    res.json(users);
}