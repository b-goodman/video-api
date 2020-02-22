import { Request, Response, NextFunction } from "express";
import { HTTP401Error, HTTP500Error } from "../utils/httpErrors";
import jwt from 'jsonwebtoken';
import fs from "fs";
import path from "path";

export interface AuthenticatedRequest extends Request {
    username: string
}

interface JwtPayload extends Object{
    username: string;
}

export const checkUserAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP401Error(res, "Unauthorized");
    } else {
        next();
    }
};

export const validateToken = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    // const authorizationHeaader = req.headers.authorization;
    // let result;
    if (req.headers.authorization) {
        const token = req.headers.authorization.replace('Bearer', '').trim() // Bearer <token>
        const options = {
            expiresIn: process.env.TOKEN_TTL,
            issuer: process.env.TOKEN_ISSUER,
            algorithm:  ["RS256"]
        };
        // verify makes sure that the token hasn't expired and has been issued by us
        // result = jwt.verify(token, process.env.JWT_SECRET, options);

        // Let's pass back the decoded token to the request object
        // req.decoded = jwt.verify(token, process.env.JWT_SECRET, options);
        const key = fs.readFileSync( path.join( __dirname, "../../public.key" ), "utf-8");
        jwt.verify(token, key, options, (err, result) => {
            if (err) {
                console.log("verification error")
                new HTTP500Error(res, "Verification Error");
            } else {
                // We call next to pass execution to the subsequent middleware
                if (result) {
                    console.log("accpeted user")
                    req.username = (result as JwtPayload).username;
                    next()
                }else{
                    console.log("unauthorized user")
                    new HTTP401Error(res, "Unauthorized");
                }
            }
        });
    } else {
        console.log("auth header not present")
        new HTTP401Error(res, "Unauthorized");
    }
}