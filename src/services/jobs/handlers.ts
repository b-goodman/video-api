import {videoQueue} from "../../queue";
import {AuthenticatedRequest} from "../../middleware/auth";
import { Response } from "express";


export const getAllJobs = async (req: AuthenticatedRequest, res: Response) => {
    const jobs = await videoQueue.getJobs(["waiting", "active", "completed", "failed"]);
    res.status(200).send(jobs);
}

export const getUserJobs = async (req: AuthenticatedRequest, res: Response) => {
    const jobTypes = req.query.jobTypes || ["waiting", "active", "completed", "failed"];
    const jobs = await videoQueue.getJobs(jobTypes);
    const userJobs = jobs.filter( (job) => {
        return job.data.ownerUsername === req.username;
    })
    res.status(200).send(userJobs);
}