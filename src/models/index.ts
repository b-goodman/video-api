import mongoose from 'mongoose';
import Video from './video';
import File from "./file"

export const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL!, { useNewUrlParser: true,  useUnifiedTopology: true });
};

export const models = { Video, File };

