import { Request, Response } from "express";
import {getUserJobs, getAllJobs} from "./handlers";
import { validateToken } from "../../middleware/auth";

export default [
    {
        path: "/api/jobs/all",
        method: "get",
        handler: [
            validateToken,
            getAllJobs
        ]
    },
    {
        path: "/api/jobs/user",
        method: "get",
        handler: [
            validateToken,
            getUserJobs
        ]
    },
];