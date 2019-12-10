import { HTTP401Error, HTTP500Error, HTTP404Error, HTTP400Error } from './../../utils/httpErrors';
import bcrypt from 'bcrypt';
import User from "../../models/user";
import { Request, Response } from "express";

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

export const deleteUser = (req: Request, res: Response) => {
    const name = req.body.name as string;
    const password = req.body.password as string;

    User.findOne({name}, (err, user) => {
        if (!err && user) {
            // We could compare passwords in our model instead of below
            bcrypt.compare(password, user.password).then(match => {
                if (match) {
                    User.deleteOne({name}, (err) => {
                        if (err) {
                            new HTTP500Error(res, "Error deleting user.");
                        }
                        res.status(200);
                    })
                } else {
                    new HTTP500Error(res, "Error authenticating user.")
                }
            })
        } else {
            throw new HTTP400Error(`Could not lookup user '${name}'`);
        }
    })
}

