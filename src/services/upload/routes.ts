// import { Request, Response } from "express";
import {handleVideoUpload} from "./handlers"


export default [
    {
        path: "/upload",
        method: "post",
        handler: [
            handleVideoUpload
        ]
    }
];