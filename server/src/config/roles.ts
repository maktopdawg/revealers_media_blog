import dotenv from 'dotenv'

dotenv.config()
/**
 * Defines roles and their corresponding permissions.
 */
export const ROLES = {
    /**
     * Admin role: Can create, edit, and manage all posts, access site management features,
     * manage subscriptions, review posts and polls, create and manage polls, and manage user accounts and comments.
     */
    "Admin": 541764,

    /**
     * Editor role: Can create and edit posts, access and review all posts and polls, create and manage polls,
     * and manage comments.
     */
    "Editor": 872389,

    /**
     * Author role: Can create and edit own posts, access and create polls.
     */
    "Author": 129954,

    /**
     * User role: Can read posts and leave comments.
     */
    "User": 439054,

    /**
     * Moderator role: Has the ability to moderate user-generated content,
     * manage comments, and assist in enforcing community guidelines.
     */
    "Moderator": 239097,

    /**
     * Contributor role: Can submit posts for review and publishing by higher-level roles,
     * but does not have direct editing capabilities.
     */
    "Contributor": 455467,

    /**
     * Viewer role: Has read-only access to posts and cannot interact with the site beyond viewing content.
     */
    "Viewer": 103681
}
