import { checkQueryParams } from "../../middleware/checks";
import { streamVideo, serveThumbnail } from "./handlers";


export default [
    {
        path: "/video/:videoID",
        method: "get",
        handler: [
            checkQueryParams,
            streamVideo,
        ]
    },
    {
        path: "/video/thumbnail/:videoID",
        method: "get",
        handler: [
            checkQueryParams,
            serveThumbnail,
        ]
    }
];