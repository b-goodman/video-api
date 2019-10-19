// import { Request, Response } from "express";
import { handleVideoUpload } from "./handlers";
import { checkUploadParams } from "../../middleware/checks";


export default [
    {
        path: "/upload",
        method: "post",
        handler: [
            checkUploadParams,
            handleVideoUpload
        ]
    }
];