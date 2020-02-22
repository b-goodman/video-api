import {models} from "../../models"
import { HTTP500Error, HTTP400Error } from './../../utils/httpErrors';
import {AuthenticatedRequest} from "../../middleware/auth";
import { Response } from "express";

export const updateVideoMetadata = async (req: AuthenticatedRequest, res: Response) => {

    const videoID = req.body.videoID;
    const {title, tags, description, dateRecorded} = req.body;

    try {
        const video = await models.Video.findOne({videoID});

        if (!video) {
            throw new HTTP400Error("No video found");
        }

        if (title) {
            video.title = title;
        }
        if (tags) {
            video.tags = tags;
        };
        if (description) {
            video.description = description;
        };
        if (dateRecorded) {
            video.dateRecorded = dateRecorded;
        }

        await video.save();

        res.status(200).send({title, tags, description, dateRecorded})

    } catch (err) {
        throw new HTTP500Error(res, "No video found");
    }
};

export const getVideoMetadata = async (req: AuthenticatedRequest, res: Response) => {
    const videoID = req.query.videoID;

    try {
        const video = await models.Video.findOne({videoID});

        if (!video) {
            throw new HTTP400Error("No video found");
        }

        res.status(200).send({
            title: video.title,
            tags: video.tags,
            description: video.description,
            dateRecorded: video.dateRecorded || new Date().toISOString(),
            duration: video.duration
        })

    } catch (err) {
        throw new HTTP500Error(res, "No video found");
    }
};