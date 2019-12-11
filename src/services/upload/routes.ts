import { handleVideoUpload } from "./handlers";
import { checkUploadParams } from "../../middleware/checks";
import { validateToken } from "../../middleware/auth";


export default [
    {
        path: "/api/upload",
        method: "post",
        handler: [
            validateToken,
            checkUploadParams,
            handleVideoUpload
        ]
    }
];