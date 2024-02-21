import { validationResult } from "express-validator";
import Report from "../models/Report";
import { Request, Response } from 'express';

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
            return getReportsByStatus(req, res, 'open')
        } else {
            return res.send({ "reports": [] })
        }
    }
}


export const getReportsByType = async (req: Request, res: Response, reportType: string) => {
    const reports = await Report.find({ reportType: reportType });
    if (!reports) return res.status(204).json({ 'response': 'No reports found.' });
    res.json(reports)
}


export const getReportsByStatus = async (req: Request, res: Response, status: string) => {
    const reports = await Report.find({ status: status });
    if (!reports) return res.status(204).json({ 'response': 'No reports found.' });
    res.json(reports)
}


export const deleteReport = async (req: Request, res: Response) => {
    if (!req.body.id) return res.status(400).json({ "response": "Report ID is required" });
    const id = req.body.id;
    try {
        const report = await Report.findOneAndDelete({ _id: id });
        if (!report) {
            return res.status(404).json({ "response": `Report ID ${id} not found` });
        }
        return res.json({ "response": `Report ID ${id} deleted successfully` });
    } catch (error) {
        console.error("Error deleting report:", error);
        return res.status(404).json({ "response": `Report ID ${id} not found` });
    }
};
