import { checkFindParams } from "../../middleware/checks";
import { streamVideo } from "./handlers";


export default [
    {
        path: "/video",
        method: "get",
        handler: [
            checkFindParams,
            streamVideo
        ]
    }
];