import { Schema, Document, model, Model } from 'mongoose';

interface Video {
    title: string;
    duration: number;
    dateUploaded: number;
    tags: string[];
    description: string;
}


interface VideoDocument extends Video, Document {};

interface VideoModel extends Model<VideoDocument> {
    textSearch: (query: string) => Promise<Video[]>
}

const videoSchema = new Schema<Video>({
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
    }
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

videoSchema.statics.textSearch = async function (query: string): Promise<Video[]> {
    return await this.find({ $text: {$search: query} });
}

export default model<VideoDocument, VideoModel>('Video', videoSchema);