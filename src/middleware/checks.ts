import { Request, Response, NextFunction } from "express";
import { HTTP400Error } from "../utils/httpErrors";

export const checkSearchParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.query.query) {
        throw new HTTP400Error("Missing 'query' parameter.");
    } else {
        next();
    }
};


export const checkQueryParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.params.videoID) {
        throw new HTTP400Error("Missing 'videoID' parameter.");
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

export const checkUserParams = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.body.name || !req.body.password) {
        throw new HTTP400Error("Missing parameter");
    } else {
        next();
    }
};


