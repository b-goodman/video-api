import { Request, Response } from "express";
import { checkSearchParams } from "../../middleware/checks";
import { searchVideos, latestVideos } from "./handlers";

export default [
    {
        path: "/search",
        method: "get",
        handler: [
            checkSearchParams,
            async (req: Request, res: Response) => {
                const videos = await searchVideos(req.query.query)
                res.send(videos);
            }
        ]
    },
    {
        path: "/search/latest",
        method: "get",
        handler: [
            // checkSearchParams,
            async (req: Request, res: Response) => {
                const videos = await latestVideos()
                res.send(videos);
            }
        ]
    }
];