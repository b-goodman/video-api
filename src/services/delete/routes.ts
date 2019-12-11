import { Request, Response } from "express";
import { checkQueryParams } from "../../middleware/checks";
import { deleteVideo } from "./handlers";

export default [
    {
        path: "/api/video",
        method: "delete",
        handler: [
            checkQueryParams,
            async (req: Request, res: Response) => {
                const stat = await deleteVideo(req.query.videoID)
                res.send(stat);
            }
        ]
    }
];