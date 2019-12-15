import Queue, {Job} from 'bull';
import {UploadedFile} from 'express-fileupload';
import {handleVideoTranscodeCompletion} from "../sockets/handleVideoTranscodeCompletion"

import {
    saveVideoToDisk,
    encodeVideo,
    saveVideoToDatabase,
    deleteTempUpload
} from "../utils/VideoUploadProcessing"

export interface VideoTranscodeJob {
    videoFile: UploadedFile;
    videoTitle: string;
    videoTags: string[];
    videoDescription: string;
    ownerUsername: string;
}

const videoQueue = new Queue<VideoTranscodeJob>('video transcoding', process.env.REDIS_URL);

videoQueue.process( async (job, done) => {

    try {
        const videoFile = job.data.videoFile;
        job.progress({stat: 1, desc: "Saving video to disk."})
        const {videoID, tmpFilepath} = await saveVideoToDisk(videoFile);
        job.progress({stat: 2, desc: "Transcoding upload."});
        const {filepath, filesize, previewPath, thumbnailPath, previewFilesize, duration} = await encodeVideo(tmpFilepath);
        const videoData = {
            videoID,
            filesize,
            previewFilesize,
            duration: duration,
            title: job.data.videoTitle,
            tags: job.data.videoTags || [],
            description: job.data.videoDescription,
            ownerUsername: job.data.ownerUsername,
        };
        job.progress({stat: 3, desc: "Updating database."});
        const stat = await saveVideoToDatabase(videoData);
        job.progress({stat: 4, desc: "Removing temp files."});
        await deleteTempUpload(tmpFilepath);

        done(null, {videoData, stat});
    } catch (err) {
        done(err);
    }
});

export default videoQueue;