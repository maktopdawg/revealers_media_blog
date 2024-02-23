import { validationResult } from "express-validator";
import Report from "../models/Report";
import User from "../models/User";
import { Request, Response } from 'express';
import { getAllAdminUsers } from "./usersController";

interface ReportProps {
    reportType: string
    description: string
    reportedBy: string
}

export const createReport = async (req: Request, res: Response) => {
    const { reportType, description, reportedBy }: ReportProps = req.body;

    if (!reportType || !description || !reportedBy) res.status(200).json({ "response": "All fields are required." });

    try {
        const result = await Report.create({
            "reportType": reportType,
            "description": description,
            "reportedBy": reportedBy
        })

        res.status(201).json(result);

    } catch (error: any) {
        res.status(500).json({ "response": error.message });
    }
}


export const getReports = async (req: Request, res: Response) => {
    console.log(req.query);
    const result = validationResult(req);
    console.log(result);

    const { query: { filter, value } } = req;

    if (!filter && !value) {
        console.log('Render All Reports')
        const reports = await Report.find();
        if (!reports) return res.status(204).json({ 'response': 'No reports found.' });
        res.json(reports)
    } else {
        const filterLowercase: string | undefined = filter?.toString().toLowerCase();
        console.log(filter)
        console.log(req.query)

        if (filterLowercase === 'bug') {
            return getReportsByType(req, res, 'Bug')
        } else if (filterLowercase === 'feature_request') {
            return getReportsByType(req, res, 'Feature Request')
        } else if (filterLowercase === 'user_feedback') {
            return getReportsByType(req, res, 'User Feedback')
        } else if (filterLowercase === 'complaint') {
            return getReportsByType(req, res, 'Complaint')
        } else if (filterLowercase === 'other') {
            return getReportsByType(req, res, 'Other')
        } else if (filterLowercase === 'open') {
            return getReportsByStatus(req, res, 'Open')
        } else if (filterLowercase === 'in_progress') {
            return getReportsByStatus(req, res, 'In Progress')
        } else if (filterLowercase === 'resolved') {
            return getReportsByStatus(req, res, 'Resolved') 
        } else if (filterLowercase === 'closed') {
            return getReportsByStatus(req, res, 'Closed')
        } else {
            return res.send({ "reports": [] })
        }
    };
};


export const getReportsByType = async (req: Request, res: Response, reportType: string) => {
    const reports = await Report.find({ reportType: reportType });
    if (!reports) return res.status(204).json({ 'response': 'No reports found.' });
    res.json(reports)
}


export const getReportsByStatus = async (req: Request, res: Response, status: string) => {
    const reports = await Report.find({ status: status });
    if (!reports) return res.status(204).json({ 'response': 'No reports found.' });
    res.json(reports);
}


export const deleteReport = async (req: Request, res: Response) => {
    if (!req.body.id) return res.status(400).json({ "response": "Report ID is required" });
    const id = req.body.id;
    try {
        const report = await Report.findOneAndDelete({ _id: id });
        if (!report) {
            return res.status(404).json({ "response": `Report ID ${id} not found` });
        };
        return res.json({ "response": `Report ID ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting report:", error);
        return res.status(404).json({ "response": `Report ID ${id} not found` });
    };
};


export const getReportById = async (req: Request, res: Response) => {
    if (!req?.params?.id) return getReports(req, res);
    const id = req.params.id;
    try {
        const report = await Report.findOne({ _id: id });
        return res.json(report);
    } catch (error) {
        return res.status(404).json({ "response": `Report with ID ${id} not found.` });
    };
};


export const assignRepresentativeToReport = async (req: Request, res: Response) => {
    if (!req?.body?.id || !req?.params?.id) return res.status(400).json({ "response": "All fields are required." });
    const reportId = req.params.id;
    const representativeId = req.body.id;

    try {
        
        try {
            const report = await Report.findOne({ _id: reportId }).exec();
            if (!report) {
                return res.status(404).json({ "response": `Poll with ID ${reportId} not found.` });
            };
        } catch (error) {
            return res.status(404).json({ "response": `Report with ID ${reportId} not found.` })
        };

        try {
            const report = await Report.findOne({ _id: reportId }).exec();
            if (!report) {
                return res.status(404).json({ "response": `Poll with ID ${reportId} not found.` });
            };

            if (report.status === 'Closed') {
                return res.status(200).json({ "response": "This report has been closed." })
            }

            const user = await User.findById(representativeId).exec()
            if (!user || !user.roles || !user.roles.Admin) {
                return res.status(401).json({ "response": `User with ID ${representativeId} does not have admin privileges.` })
            }

            report.assignedTo = representativeId;
            const result = await report.save();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ "response": `User with ID ${representativeId} not found.` });
        };

    } catch (error) {
        return res.status(500).json({ "response": "Internal server error." });
    };
};


export const changeStatus = async (req: Request, res: Response) => {
    if (!req?.params?.id || !req?.body?.id) return res.status(400).json({ "response": "All fields are required." });
    const reportId = req.params.id;
    const representativeId = req.body.id;
    const process: string[] = ['Open', 'In Progress', 'Resolved', 'Closed'];

    try {

        try {
            const report = await Report.findOne({ _id: reportId }).exec();
            if (!report) {
                return res.status(404).json({ "response": `Poll with ID ${reportId} not found.` });
            };
        } catch (error) {
            return res.status(404).json({ "response": `Report with ID ${reportId} not found.` })
        };

        try {
            const report = await Report.findOne({ _id: reportId }).exec();
            if (!report) {
                return res.status(404).json({ "response": `Report with ID ${reportId} not found.` });
            };

            if (!report.assignedTo) {
                return res.status(200).json({ "response": `No representative has been assigned to this report yet.` });
            };

            if (report.status === 'Closed') {
                return res.status(200).json({ "response": `This report has been closed!` });
            };

            // Find the user by ID and check if they have the Admin role
            const user = await User.findById(representativeId).exec();
            if (!user || !user.roles || !user.roles.Admin) {
                return res.status(401).json({ "response": `User with ID ${representativeId} does not have admin privileges.` });
            }

            const index = process.indexOf(report.status);
            if (index !== -1 && index < process.length - 1) {
                // In this code snippet, I've added a type assertion (as "Open" | "In Progress" | "Resolved" | "Closed") when assigning process[index + 1] to report.status. This tells TypeScript that even though process[index + 1] is a string, it should be treated as one of the specific string literals defined in the type "Open" | "In Progress" | "Resolved" | "Closed". 
                report.status = process[index + 1] as "Open" | "In Progress" | "Resolved" | "Closed"; // Type assertion
                const result = await report.save();
                return res.status(200).json(result);
            } else {
                return res.status(200).json({ "response": `Invalid status or cannot proceed further.` });
            }
        } catch (error) {
            console.log(error)
            return res.status(404).json({ "response": `User with ID ${representativeId} not found.` });
        };

    } catch (error) {
        return res.status(500).json({ "response": "Internal server error." });
    };
};