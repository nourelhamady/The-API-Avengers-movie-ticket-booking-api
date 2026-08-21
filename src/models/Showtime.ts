import mongoose from "mongoose";

const ShowTime=new mongoose.Schema({
    movie:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Movie",
        required:true
    },
    hallNo:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    ticketPrice:{
        type:Number,
        required:true
    },
    totalCapacity:{
        type:Number,
        required:true,
        min:1
    },
    bookedSeats:
    {
        type:[String],
        default:[]
    }
})
export const showTime = mongoose.model("showTime",ShowTime)