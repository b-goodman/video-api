import { checkFindParams } from "../../middleware/checks";
import { streamVideo, serveThumbnail } from "./handlers";


export default [
    {
        path: "/video",
        method: "get",
        handler: [
            checkFindParams,
            streamVideo,
        ]
    },
    {
        path: "/video/thumbnail",
        method: "get",
        handler: [
            checkFindParams,
            serveThumbnail,
        ]
    }
];