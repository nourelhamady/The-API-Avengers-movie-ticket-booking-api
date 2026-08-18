import { Schema, model, Document } from "mongoose";

export interface User extends Document {
    fullName : string;
    email : string;
    password : string;
    role : "customer" | "admin";
}

const userSchema = new Schema<User> ({
    fullName : {
        type : String,
        required : true,
        trim : true,
    },

    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    },

    password : {
        type : String,
        required : true,
    },

    role : {
        type : String,
        enum : ["customer", "admin"],
        default : "customer",
        required : true,
    },
});

export const userModel = model<User> ("user", userSchema);