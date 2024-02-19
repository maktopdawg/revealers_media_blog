import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../models/User";

/**
 * Retrieves a user by their username from the database.
 * @async
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>} A Promise that resolves once the user data is sent in the response.
 */
export const getUserByUsername = async (req: Request, res: Response) => {
    if (!req?.params?.username) return res.status(400).json({ 'response': "User's username is required" });
    const username: string = req.params.username;
    const user = await User.findOne({ username: username }).exec();
    console.log(user)
    if (!user) return res.status(204).send({ 'message': `User with user name '${username}' not found` });
    res.json(user);
}


/**
 * Retrieves all users from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    console.log(req.query)
    const result = validationResult(req)
    console.log(result)

    const { query: { filter, value } } = req;

    if (!filter && !value) {
        console.log('Render All Users')
        const users = await User.find();
        if (!users) return res.status(204).json({ 'response': 'No users found.' });
        res.json(users);
    } else {
        const filterLowercase: string | undefined = filter?.toString().toLowerCase();
        if (filterLowercase === 'admin') {
            return getAllAdminUsers(req, res)

        } else if (filterLowercase === 'editor') {
            return getAllEditorUsers(req, res)

        } else if (filterLowercase === 'author') {
            return getAllAuthorUsers(req, res)

        } else if (filterLowercase === 'verified') {
            return getAllVerifiedUsers(req, res)

        } else if (filterLowercase === 'unverified') {
            return getAllUnverifiedUsers(req, res)

        } else {
            return res.send({ "users": [] })
        }
    }
}


export const getUsersBySubsciption = (req: Request, res: Response) => {
    const result = validationResult(req)
    console.log(result)

    const { query: { filter, value } } = req;

    if (!filter && !value) {
        console.log('Render Nothing')
        res.send({
            "subscriptionTypes": [
                "Newsletter", "Premium"
            ] 
        })

    } else {
        const filterLowercase: string | undefined = filter?.toString().toLowerCase();

        if (filterLowercase === 'newsletter') {
            return getNewsletterSubscribedUsers(req, res)

        } else if (filterLowercase === 'premium') {
            return getPremiumSubscribedUsers(req, res)

        } else {
            res.send({ "users": [] })
        }
    }
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
    if (!users) return res.status(204).json({ 'response': 'No users found.' });
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
    if (!users) return res.status(204).json({ 'response': 'No users found.' });
    res.json(users);
}


/**
 * Deletes a user from the database based on the provided user ID.
 * @param {Request} req - The request object containing the user ID in the body.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the result of the deletion operation.
 */
export const deleteUser = async (req: Request, res: Response) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'User ID is required.' });
    const id = req.body.id;
    const user = await User.findOne({ _id: id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${id} not found` });
    };
    const result = await user.deleteOne({ _id: id });
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


/**
 * Retrieves users subscribed to the premium feature from the database.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @returns {Promise<void>} - A promise resolving to the list of users subscribed to the newsletter.
 */
export const getPremiumSubscribedUsers = async (req: Request, res: Response) => {
    const users = await User.find({ "subscription.premiumSubscription": true });
    if (!users) return res.status(204).json({ 'response': 'No user has subscribed to the newsletter subscription.' });
    res.json(users);
}