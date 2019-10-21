import fs from "fs";
import path from "path";
import {models} from "../../models";
import { Request, Response } from "express";

export const streamVideo = async (req: Request, res: Response) => {
    const videoID = req.query.videoID;

    const videoFilepath = path.join( process.env.DATA_ROOT, videoID, "encoded.mp4" );

    const videoDoc = await models.Video.findOne({videoID});

    if (videoDoc) {
        const fileSize = videoDoc.filesize;
        console.log(fileSize)
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1
            const chunksize = (end-start)+1
            const file = fs.createReadStream(videoFilepath, {start, end})
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(videoFilepath).pipe(res)
        }
    }

}