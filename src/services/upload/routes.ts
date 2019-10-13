import { Request, Response } from "express";
import {UploadedFile} from 'express-fileupload';

export default [
    {
        path: "upload/",
        method: "post",
        handler: [
            async (req: Request, res: Response) => {

                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send('No files were uploaded.');
                }

                const videoFile = req.files.video as UploadedFile;

                videoFile.mv( `${process.env.DATA_ROOT}`, (err) => {
                    if (err) {
                        return res.status(500).send(err);
                    } else {
                        res.send('File uploaded!');
                    }
                });
            }
        ]
    }
];