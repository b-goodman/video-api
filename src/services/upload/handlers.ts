import {UploadedFile} from 'express-fileupload';
import { HTTP500Error } from './../../utils/httpErrors';
import {AuthenticatedRequest} from "../../middleware/auth";
import { Response } from "express";

import {videoQueue} from "../../queue";

export const handleVideoUpload = async (req: AuthenticatedRequest, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    try {

        const transcodeJobData = {
            videoFile: req.files.video as UploadedFile,
            videoTitle: req.body.title,
            videoTags: req.body.tags || [],
            videoDescription: req.body.description,
            ownerUsername: req.user,
        };

        const transcodeProcess = await videoQueue.add(transcodeJobData);


        res.status(200).send({msg:"Video added to process queue.", job:transcodeProcess});

    } catch (err) {
        throw new HTTP500Error(res, err);
    }
};
