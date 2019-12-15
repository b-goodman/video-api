import io from "socket.io";
import {Job} from "bull";
import {videoQueue, VideoTranscodeJob} from "../queue";



export const handleVideoTranscodeCompletion = (server: io.Server)  => {
    videoQueue.on("completed", (job: Job<VideoTranscodeJob>, result: any) => {

        // server.emit()
    });
}


export default handleVideoTranscodeCompletion;