import { Request, Response, NextFunction } from 'express';
const path = require('path');
const fsPromises = require('fs').promises;
const fs = require('fs');
const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

/**
 * Log events to a file with timestamp, UUID, and message.
 * @param message The message to be logged.
 * @param fileName The name of the log file.
 * @returns A promise that resolves when the log is complete.
 */
const logEvents = async (message: string, fileName: string): Promise<void> => {
    const dateTime: string = `(${format(new Date(), 'yyyy-MM-dd HH:mm:ss')})`;
    const content: string = `${dateTime}\t${uuid()}\t${message}\n`;
    const folderName: string = 'logs';

    try {
        // Create logs directory if it doesn't exist
        if (!fs.existsSync(path.join(__dirname, '..', folderName))) {
            await fsPromises.mkdir(path.join(__dirname, '..', folderName));
        }

        // Append content to log file
        await fsPromises.appendFile(path.join(__dirname, '..', folderName, fileName), content);

    } catch (error) {
        console.log(error);
    }
}


/**
 * Express middleware function for logging request details.
 * @param req The Express request object.
 * @param res The Express response object.
 * @param next The next middleware function.
 */
const logger = (req: Request, res: Response, next: NextFunction): void => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

export default logger;