import { Request, Response } from "express";
import { checkQueryParams } from "../../middleware/checks";
import { queryVideo } from "./handlers";

export default [
    {
        path: "/api/query/:videoID",
        method: "get",
        handler: [
            // checkQueryParams,
            async (req: Request, res: Response) => {
                const stat = await queryVideo(req.params.videoID)
                res.send(stat);
            }
        ]
    },
];