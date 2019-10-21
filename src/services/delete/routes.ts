import { Request, Response } from "express";
import { checkFindParams } from "../../middleware/checks";
import { deleteVideo } from "./handlers";

export default [
    {
        path: "/video",
        method: "delete",
        handler: [
            checkFindParams,
            async (req: Request, res: Response) => {
                const stat = await deleteVideo(req.query.videoID)
                res.send(stat);
            }
        ]
    }
];