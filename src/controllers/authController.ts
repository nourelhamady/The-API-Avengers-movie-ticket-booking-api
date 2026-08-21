import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/User";
import jwt from "jsonwebtoken";

export const register = async (req : Request, res : Response) => {
    try {
        const {fullName, email, password,role} = req.body;
        if (!fullName || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email))
            return res.status(400).json({message : "Invalid email format"});

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password))
            return res.status(400).json({message : "Invalid password format"});

        const isEmailExist = await userModel.findOne({email});
        if (isEmailExist)
            return res.status(400).json({message : "Email already exists"});

        const hashedPassword = await bcrypt.hash(password, 10);

        await userModel.create({fullName, email, password : hashedPassword,role});
        return res.status(201).json({message : "User registered successfully"});
    }

    catch (error) {return res.status(500).json({message : "Failed to register user"})};
}

export const login = async (req : Request, res : Response) => {

    try {
        const {email, password} = req.body;
        if (!email || !password)
            return res.status(400).json({message: "Email and password are required"});


        const user = await userModel.findOne({email});

        if (!user)
            return res.status(401).json({message : "Invalid email or password"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect)
            return res.status(401).json({message : "Invalid email or password"});

        const token = jwt.sign({userId : user._id, role : user.role}, process.env.JWT_SECRET!, {expiresIn : "1h"});

        return res.status(200).json({message : "Login successful", token});
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({message : "Failed to login user"});
    };
}