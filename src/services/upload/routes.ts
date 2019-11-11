import { handleVideoUpload } from "./handlers";
import { checkUploadParams } from "../../middleware/checks";
import { validateToken } from "../../middleware/auth";


export default [
    {
        path: "/upload",
        method: "post",
        handler: [
            validateToken,
            checkUploadParams,
            handleVideoUpload
        ]
    }
];