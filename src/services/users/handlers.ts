import { HTTP401Error, HTTP500Error, HTTP404Error, HTTP400Error } from './../../utils/httpErrors';
import User from "../../models/user";
import Video from "../../models/video";
import { Request, Response } from "express";
import { AuthenticatedRequest } from './../../middleware/auth';
import issueToken from "./issueToken";
export {issueToken};


export const addUser = (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = new User({ username, password }); // document = instance of a model

    user.save((err, user) => {
        if (!err) {
            const status = 201;
            res.status(201).send({status, username});
        } else {
            const status = 500;
            res.status(500).send({status, err: err});
        }
    });
};

export const deleteUser = (req: AuthenticatedRequest, res: Response) => {
    const name = req.username;
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
    const order = req.query.order || "ascending";
    const skip = req.query.skip ? parseInt(req.query.skip) : 0;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;

    const qtySearch = await Video.userSearch(req.username);
    const qty = qtySearch.length;

    const query = limit ? {skip, limit, order} : {skip, order};
    const videos = await Video.userSearch(req.username, query);
    res.send({videos, qty, order, skip, limit});
}

