import { Request, Response } from "express";
import { addUser, issueToken, deleteUser, getUserVideos } from "./handlers";
import { checkUserParams } from "../../middleware/checks";
import { validateToken, AuthenticatedRequest } from './../../middleware/auth';


export default [
    {
        path: "/api/users",
        method: "post",
        handler: [
            checkUserParams,
            addUser
        ]
    },
    {
        path: "/api/users",
        method: "delete",
        handler: [
            validateToken,
            deleteUser
        ]
    },
    {
        path: "/api/login",
        method: "post",
        handler: [
            checkUserParams,
            issueToken
        ]
    },
    {
        path: "/api/isAuth",
        method: "get",
        handler: [
            validateToken,
            async (req: Request, res: Response) => {
                res.status(200).send(true);
            }
        ]
    },
    {
        path: "/api/users/uploads",
        method: "get",
        handler: [
            validateToken,
            // checkUserUploadParams,
            getUserVideos,
        ]
    }
];