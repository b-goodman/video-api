import { HTTP500Error } from './../../utils/httpErrors';
import fs from "fs";
import path from "path";
import {models} from "../../models";
import { Request, Response } from "express";

const serveThumbnail = async (req: Request, res: Response) => {
    const videoID = req.query.videoID;

    const thumbnailFilepath = path.join( process.env.DATA_ROOT, videoID, "thumbnail.png" );

    // const file = fs.createReadStream(thumbnailFilepath)
    const head = {
        'Content-Type': 'image/png',
    };

    try{
        res.writeHead(200, head)
        fs.createReadStream(thumbnailFilepath).pipe(res)
    } catch {
        throw new HTTP500Error(`Preview for video ${videoID} not found.`)
    }
};

export default serveThumbnail;
