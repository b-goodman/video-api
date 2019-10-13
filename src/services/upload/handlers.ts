import { models } from './../../models';
import { HTTP500Error } from './../../utils/httpErrors';
import { VideoData } from "../../models/video";
import { Request, Response } from "express";
import {UploadedFile} from 'express-fileupload';
import path from "path";
import shortid from 'shortid';
import ffmpeg from "ffmpeg";


export const handleVideoUpload = async (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const videoFile = req.files.video as UploadedFile;

}


const saveVideoToDatabase = (videoData: VideoData) => {
    const video = new models.Video(videoData);
    return video.save();
}


export const saveVideoToDisk = (videoFile: UploadedFile) => {
    return new Promise<{videoID: string, tmpFilepath: string}>( (resolve, reject) => {
        const videoID = shortid.generate();
        const tmpFilepath = path.join( process.env.DATA_ROOT, videoID, "upload.tmp" );
        videoFile.mv( `${process.env.DATA_ROOT}`, (err) => {
            if (err) {
                reject(new HTTP500Error("Could not save file to disk."));
            } else {
                resolve({videoID, tmpFilepath});
            }
        });
    })
};


export const encodeVideo = (tmpFilepath: string) => {
    return new Promise( async (resolve, reject) => {
        try {
            const video = await new ffmpeg(tmpFilepath);

            const duration = video.metadata.duration;
            video.setVideoFormat("mp4");

            return video.save(`${path.dirname(tmpFilepath)}.mp4` , (err: Error, filepath: string) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({filepath, duration})
                }
            });

        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    })
}