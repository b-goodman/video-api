import { HTTP400Error } from './../../utils/httpErrors';
import {models} from "../../models/index";
import { VideoDocument } from "../../models/video";


export const queryVideo = async (videoID: string): Promise<VideoDocument>  => {
    const videoQuery = await models.Video.findOne({videoID});
    if (videoQuery) {
        return videoQuery;
    } else {
        throw new HTTP400Error("No video found.")
    }
}