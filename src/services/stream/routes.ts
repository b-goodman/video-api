import { checkQueryParams } from "../../middleware/checks";
import { streamVideo, serveThumbnail } from "./handlers";


export default [
    {
        path: "/api/video/:videoID",
        method: "get",
        handler: [
            // checkQueryParams,
            streamVideo,
        ]
    },
    {
        path: "/api/video/thumbnail/:videoID",
        method: "get",
        handler: [
            // checkQueryParams,
            serveThumbnail,
        ]
    }
];