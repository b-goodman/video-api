import { Schema, Document, model, Model } from 'mongoose';

export interface FileData {
    videoID: string;
    filepath: string,
    filesize: number,
    previewPath: string,
    thumbnailPath: string,
}


interface FileDocument extends FileData, Document {};

interface FileModel extends Model<FileDocument> {
    // textSearch: (query: string) => Promise<FileData[]>
}

const fileSchema = new Schema<FileDocument>({
    videoID: {
        type: String,
        required: true,
        unique: true,
    },
    filepath: {
        type: String,
        required: true,
    },
    filesize: {
        type: Number,
        required: true,
    },
    previewPath: {
        type: String,
        required: true
    },
    thumbnailPath: {
        type: String,
        required: true
    },
});

export default model<FileDocument, FileModel>('File', fileSchema);