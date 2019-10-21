import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.q) {
        throw new HTTP400Error("Missing q parameter");
    } else {
        next();
    }
};


export const checkFindParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.videoID) {
        throw new HTTP400Error("Missing 'videoID' parameter");
    } else {
        next();
    }
};

export const checkUploadParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.title) {
        throw new HTTP400Error("Missing 'title' parameter");
    } else if (!req.body.description) {
        throw new HTTP400Error("Missing 'description' parameter");
    } else {
        next();
    }
};


