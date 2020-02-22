import { Request, Response } from "express";
import { deleteVideo } from "./handlers";

export default [
    {
        path: "/api/video",
        method: "delete",
        handler: [
            async (req: Request, res: Response) => {
                const stat = await deleteVideo(req.body.videoID)
                res.send(stat);
            }
        ]
    }
];