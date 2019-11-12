import { Schema, Document, model, Model } from 'mongoose';

export interface VideoData {
    videoID: string;
    filesize: number,
    previewFilesize: number,
    title: string;
    duration: number;
    dateUploaded?: number;
    tags?: string[];
    description?: string;
}


export interface VideoDocument extends VideoData, Document {};

interface VideoModel extends Model<VideoDocument> {
    textSearch: (query: string, opts?: TextSearchOpts) => Promise<VideoData[]>
    dateSearch: (opts?: DateSearchOpts) => Promise<VideoData[]>
}

const videoSchema = new Schema<VideoDocument>({
    videoID: {
        type: String,
        required: true,
        unique: true,
    },
    filesize: {
        type: Number,
        required: true,
    },
    previewFilesize: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    dateUploaded: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    tags: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
});

videoSchema.index(
    {
        title: 'text',
        tags: 'text',
        description: 'text'
    },
    {
        weights: {
            title: 10,
            tags: 5,
        },
        name: 'video_search_index'
    },
);


interface SearchOpts {
    skip?: number;
    limit?: number
};

interface TextSearchOpts extends SearchOpts {

};
videoSchema.statics.textSearch = async function (query: string, opts?:TextSearchOpts ): Promise<VideoData[]> {
    const limitUpto = opts ? opts.limit || 0 : 0;
    return await this.find({ $text: {$search: query} }).limit(limitUpto);
}

interface DateSearchOpts extends SearchOpts {
    dateFrom?: string
    dateTo?: string
}
videoSchema.statics.dateSearch = async function (opts?:DateSearchOpts): Promise<VideoData[]> {
    const limitUpto = opts ? opts.limit || 0 : 0;
    const skipAmmount = opts ? opts.skip || 0 : 0;

    return await this.find().sort({dateUploaded: 1}).skip(skipAmmount).limit(limitUpto);
}

export default model<VideoDocument, VideoModel>('Video', videoSchema);