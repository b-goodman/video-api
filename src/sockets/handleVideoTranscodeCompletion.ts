import { VideoDocument } from './../models/video';
import io from "socket.io";
import {Job} from "bull";
import {videoQueue, VideoTranscodeJob} from "../queue";



export const handleVideoTranscodeCompletion = (server: io.Server)  => {
    videoQueue.on("active", (job: Job<VideoTranscodeJob>, result: VideoDocument) => {
        const msg = {
            ownerUsername: job.data.ownerUsername,
            videoID: result.videoID,
            jobID: job.id,
            videoTitle: job.data.videoTitle,
        }
        server.emit("video_process_started", JSON.stringify(msg));
    });

    videoQueue.on("completed", (job: Job<VideoTranscodeJob>, result: VideoDocument) => {
        const msg = {
            ownerUsername: job.data.ownerUsername,
            videoID: result.videoID,
            jobID: job.id,
            videoTitle: job.data.videoTitle,
        }
        server.emit("video_process_complete", JSON.stringify(msg));
    });

    videoQueue.on("error", (error) => {
        console.log("handleVideoTranscodeCompletion [vido_process_error]", error);
        server.emit("video_process_error", JSON.stringify(error));
    });
}


export default handleVideoTranscodeCompletion;