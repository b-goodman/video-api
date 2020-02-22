import {Model, model, Document, Schema} from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserData {
    username: string;
    password: string;
}

interface UserDocument extends UserData, Document {};

interface UserModel extends Model<UserDocument> {}

// schema maps to a collection
const userSchema = new Schema<UserDocument>({
    username: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    }
});

userSchema.pre<UserDocument>('save', function(next) {
    const user = this;
    if(!user.isModified || !user.isNew) { // don't rehash if it's an old user
        next();
    } else {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) {
                console.log('Error hashing password for user', user.username);
                next(err);
            } else {
                user.password = hash;
                next();
            }
        });
    }
});

export default model<UserDocument, UserModel>('User', userSchema);