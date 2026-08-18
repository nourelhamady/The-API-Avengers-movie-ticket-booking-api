import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/user.model";

export const register = async (req : Request, res : Response) => {
    try {
        const {fullName, email, password} = req.body;
        const isEmailExist = await userModel.findOne({email});

        if (isEmailExist)
            return res.status(400).json({message : "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({fullName, email, password : hashedPassword,});

        return res.status(201).json({message : "User registered successfully",
            user : {
                id : user._id,
                fullName : user.fullName,
                email : user.email,
                role : user.role
            }
        });
    }

    catch (error) {res.status(500).json({message : "Failed to register user"})};
}