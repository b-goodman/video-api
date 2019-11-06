import fs from "fs";
import { promisify } from "util";
import { models } from './../../models';
import { HTTP500Error } from './../../utils/httpErrors';
import { VideoData } from "../../models/video";
import { Request, Response } from "express";
import {UploadedFile} from 'express-fileupload';
import path from "path";
import shortid from 'shortid';
import ffmpeg from "ffmpeg";
import videoPreview, {videoFrame} from "@bgoodman/video-preview";
const stat = promisify(fs.stat);

export const handleVideoUpload = async (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const videoFile = req.files.video as UploadedFile;

    const {videoID, tmpFilepath} = await saveVideoToDisk(videoFile);

    const {filepath, filesize, previewPath, thumbnailPath, previewFilesize, duration} = await encodeVideo(tmpFilepath);

    const videoData = {
        videoID,
        filesize,
        previewFilesize,
        duration: duration,
        title: req.body.title,
        tags: req.body.tags || [],
        description: req.body.description,
    };

    const stat = await saveVideoToDatabase(videoData);

    await deleteTempUpload(tmpFilepath);

    res.send({videoData, stat});

}

const deleteTempUpload = (tmpFilepath: string) => {
    return new Promise( (resolve, reject) => {
        fs.unlink(tmpFilepath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(tmpFilepath);
            }
        })
    })
}

const saveVideoToDatabase = (videoData: VideoData) => {
    const video = new models.Video(videoData);
    return video.save();
}

const saveVideoToDisk = (videoFile: UploadedFile) => {
    return new Promise<{videoID: string, tmpFilepath: string}>( (resolve, reject) => {
        const videoID = shortid.generate();
        const tmpFilepath = path.join( process.env.DATA_ROOT, videoID, "upload.tmp" );
        console.log(tmpFilepath);
        videoFile.mv( tmpFilepath, (err) => {
            if (err) {
                reject(new HTTP500Error(err));
            } else {
                resolve({videoID, tmpFilepath});
            }
        });
    })
};

const createVideoPreviews = async (videoFilepath: string, outputDir: string) => {
    const opts = {scale: {width: 210}};
    const previewResp = await videoPreview(videoFilepath, path.join( outputDir, `preview.mp4`), opts );
    const thumbnailResp = await videoFrame(videoFilepath, path.join( outputDir, `thumbnail.png`), opts );
    const fileStat = await stat(previewResp.output);
    const filesize = fileStat.size;
    return {previewPath: previewResp.output, previewFilesize: filesize, thumbnailPath: thumbnailResp.output }
}



const encodeVideo = (tmpFilepath: string) => {
    return new Promise<{filepath: string, filesize: number, previewPath: string, previewFilesize: number, thumbnailPath: string, duration: number}>( async (resolve, reject) => {
        try {
            const video = await new ffmpeg(tmpFilepath);

            const duration = (video.metadata.duration! as any).seconds as number;
            video.setVideoFormat("mp4");

            return video.save( path.join( `${path.dirname(tmpFilepath)}`, `encoded.mp4`) , async (err: Error, filepath: string) => {
                if (err) {
                    reject(err)
                } else {
                    const fileStat = await stat(filepath);
                    const filesize = fileStat.size;
                    const {previewPath, previewFilesize, thumbnailPath} = await createVideoPreviews(filepath, path.dirname(tmpFilepath));
                    resolve({filepath, filesize, previewPath, previewFilesize, thumbnailPath, duration})
                }
            });

        } catch (e) {
            console.log(e.code);
            console.log(e.msg);
        }
    })
}
