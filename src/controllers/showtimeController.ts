import { Request,Response } from "express";
import { showTime } from "../models/Showtime";
import Movie from "../models/Movie";
import Booking from "../models/Booking";
export const createShowTimes=async(req:Request,res:Response)=>{
    try{
        const{movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity}=req.body
       const movieExist = await movie.findById(movie)
        if(!movieExist){
           return res.status(404).json({message:"Movie not found"})
        }
        

        const showtime=await showTime.create({
            movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity
        })
        res.status(201).json({message:"Showtime successfully created",showtime})
    }
    catch(error){
        res.status(500).json({message:"Failed to create showtime",error})
    }
}
export const allShowTimes=async(req:Request,res:Response)=>{
    try{
        const showtimes= await showTime.find()
        res.status(200).json(showtimes)
    }
    catch(error){
        res.status(500).json(error)
    }
}
export const ShowTimebyID=async(req:Request,res:Response)=>{
    try{
        const show=await showTime.findById(req.params.id)
        if(!show){
            return res.status(404).json({message:"Showtime not found"})
        }
        res.status(200).json(show)
    }
    catch(error){
        res.status(500).json(error)
    }

}
export const updateShowTimes=async(req:Request,res:Response)=>{
    try{
        const show = await showTime.findByIdAndUpdate(req.params.id,req.body,
        { returnDocument:'after'})
        if(!show){
            return res.status(404).json({message:"Showtime not found"})
        }
        res.status(200).json({message:"Showtime updated",show})
    }
    catch(error){
        res.status(500).json(error)
    }
}

export const deleteShowTimes=async(req:Request,res:Response)=>{
    try{ 
        
         const bookingExists = await Booking.findOne({
            showtime: req.params.id,
            bookingStatus: "Confirmed"
            });

            if (bookingExists) {
            return res.status(400).json({
                message: "Cannot delete showtime with confirmed bookings"
            });
            }
         

        const show = await showTime.findByIdAndDelete(req.params.id)
        if(!show){
            return res.status(404).json({message:"Showtime not found"})
        }
        res.status(200).json({message:"Showtime Deleted"})
    }
    catch(error){
        res.status(500).json(error)

    }
}







