import { NextFunction, Request, Response } from "express";
import { User } from "../models/UserModel";


interface CreateUserRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
    };
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export const createUser = async (req: CreateUserRequest, res: Response, next: NextFunction) => {
    try {
        const {name, email, password} = req.body;
        const user = new User({name, email, password});
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        next(error);
    
    }
}