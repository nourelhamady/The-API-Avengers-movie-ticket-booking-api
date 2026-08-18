import mongoose from "mongoose";
const movieSchema=new mongoose.Schema
(
    {
        title:
        {
            type:String,
            required:true
        },
        genre:
        {
            type:String,
            required:true
        },
        duration:
        {
            type:Number,
            required:true,
            min:1
        },
        description:
        {
            type:String,
            required:true
        },
        posterUrl:
        {
            type:String,
            required:true
        },
        rating:
        {
            type:Number,
            required:true,
            min:0,
            max:10
        },
        status:
        {
            type:String,
            enum:["Now Showing","Coming Soon"],
            required:true
        }
    }
);
export default mongoose.model("Movie",movieSchema);