import { Request, Response } from "express";
import { addUser, issueToken, deleteUser } from "./handlers";
import { checkUserParams } from "../../middleware/checks";
import { validateToken } from './../../middleware/auth';


export default [
    {
        path: "/users",
        method: "post",
        handler: [
            checkUserParams,
            addUser
        ]
    },
    {
        path: "/users",
        method: "delete",
        handler: [
            validateToken,
            deleteUser
        ]
    },
    {
        path: "/login",
        method: "post",
        handler: [
            checkUserParams,
            issueToken
        ]
    },
    {
        path: "/isAuth",
        method: "get",
        handler: [
            validateToken,
            async (req: Request, res: Response) => {
                res.status(200).send(true);
            }
        ]
    },
];