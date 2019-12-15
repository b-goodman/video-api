import { UploadedFile } from "express-fileupload";
import shortid from "shortid";
import videoPreview, { videoFrame } from "@bgoodman/video-preview";
import ffmpeg from "ffmpeg";
import fs from "fs";
import { promisify } from "util";
import Video, { VideoData } from "../models/video";
import path from "path";
const stat = promisify(fs.stat);

export const deleteTempUpload = (tmpFilepath: string) => {
    return new Promise( (resolve, reject) => {
        fs.unlink(tmpFilepath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(tmpFilepath);
            }
        })
    })
};

export const saveVideoToDatabase = (videoData: VideoData) => {
    const video = new Video(videoData);
    return video.save();
};

export const saveVideoToDisk = (videoFile: UploadedFile) => {
    return new Promise<{videoID: string, tmpFilepath: string}>( (resolve, reject) => {
        const videoID = shortid.generate();
        const tmpFilepath = path.join( process.env.DATA_ROOT, videoID, "upload.tmp" );
        console.log(tmpFilepath);
        videoFile.mv( tmpFilepath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve({videoID, tmpFilepath});
            }
        });
    })
};

export const createVideoPreviews = async (videoFilepath: string, outputDir: string) => {
    const opts = {scale: {width: 210, height: -2}};
    try {
        console.log("generating preview video");
        const previewResp = await videoPreview(videoFilepath, path.join( outputDir, `preview.mp4`), opts );
        console.log("generating preview frame");
        const thumbnailResp = await videoFrame(videoFilepath, path.join( outputDir, `thumbnail.png`), opts );
        const fileStat = await stat(previewResp.output);
        const filesize = fileStat.size;
        return {
            previewPath: previewResp.output,
            previewFilesize: filesize,
            thumbnailPath: thumbnailResp.output
        }
    } catch (err) {
        throw err;
    }
};

export const encodeVideo = (tmpFilepath: string) => {
    return new Promise<{filepath: string, filesize: number, previewPath: string, previewFilesize: number, thumbnailPath: string, duration: number}>( async (resolve, reject) => {
        try {
            const video = await new ffmpeg(tmpFilepath);

            console.log("encoding video to mp4");
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
};