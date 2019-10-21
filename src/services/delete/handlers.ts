import { HTTP400Error } from './../../utils/httpErrors';
import {models} from "../../models/index";
import { VideoDocument } from "../../models/video";
import rimraf from "rimraf";
import path from "path";

const deleteVideoDir = (videoID: string) => {
    return new Promise((resolve, reject) => {
        const parentDir = path.join( process.env.DATA_ROOT, videoID );
        rimraf(parentDir, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve(parentDir)
            }
        })
    })
}

export const deleteVideo = async (videoID: string): Promise<VideoDocument>  => {
        const videoQuery = await models.Video.findOne({videoID});
        if (videoQuery) {
            try {
                await deleteVideoDir(videoID);
                const doc = await videoQuery.remove();
                return doc;
            } catch (err) {
                throw err;
            }
        } else {
            throw new HTTP400Error("No video found.")
        }
}