import { HTTP401Error, HTTP500Error, HTTP404Error, HTTP400Error } from './../../utils/httpErrors';
import bcrypt from 'bcrypt';
import User from "../../models/user";
import Video from "../../models/video";
import { Request, Response } from "express";
import { AuthenticatedRequest } from './../../middleware/auth';
import issueToken from "./issueToken";
export {issueToken};


export const addUser = (req: Request, res: Response) => {
    const { name, password } = req.body;
    const user = new User({ name, password }); // document = instance of a model

    user.save((err, user) => {
        if (!err) {
            const status = 201;
            res.status(201).send({status, result: user});
        } else {
            const status = 500;
            res.status(500).send({status, err: err});
        }
    });
};

export const deleteUser = (req: AuthenticatedRequest, res: Response) => {
    const name = req.user;
    User.findOne({name}, (err, user) => {
        if (!err && user) {
            User.deleteOne({name}, (err) => {
                if (err) {
                    new HTTP500Error(res, "Error deleting user.");
                }
                res.status(200);
            })
        } else {
            throw new HTTP400Error(`Could not lookup user '${name}'`);
        }
    })
}

export const getUserVideos = async (req: AuthenticatedRequest, res: Response) => {
    const videos = await Video.userSearch(req.user, {skip: req.body.skip, limit: req.body.limit})
    res.send(videos);
}

