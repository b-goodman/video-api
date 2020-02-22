import { updateVideoMetadata, getVideoMetadata } from "./handlers";
import { validateToken } from "../../middleware/auth";

export default [
    {
        path: "/api/video/metadata",
        method: "post",
        handler: [
            validateToken,
            updateVideoMetadata
        ]
    },
    {
        path: "/api/metadata",
        method: "get",
        handler: [
            validateToken,
            getVideoMetadata
        ]
    },
];