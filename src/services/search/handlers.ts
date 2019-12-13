import {models} from "../../models/index";


export const searchVideos = (query: string) => {
    return models.Video.textSearch(query);
}

export const latestVideos = () => {
    return models.Video.dateSearch({limit: 10});
}
