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
            movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity,bookedSeats:[]
        });
        res.status(201).json({message:"Showtime successfully created",showtime})
    }
    catch(error){
        console.error("Create Showtime Error:", error);
        res.status(500).json({message: "Internal Server Error",})
    }
};
export const allShowTimes=async(req:Request,res:Response)=>{
    try{
        const showtimes= await showTime.find().populate("movie", "title genre posterUrl rating");
        res.status(200).json(showtimes)
    }
    catch(error){
        console.error("Get Showtimes Error:", error);
        res.status(500).json({ message: "Internal Server Error"});
    }
};
export const ShowTimebyID=async(req:Request,res:Response)=>{
    try{
        const show=await showTime.findById(req.params.id).populate("movie", "title genre posterUrl rating");
        if(!show){
            return res.status(404).json({message:"Showtime not found"})
        }
        res.status(200).json(show)
    }
    catch(error){
        console.error("Get Showtime Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
    }

};
export const updateShowTimes=async(req:Request,res:Response)=>
{
    try
    {
    const showtime = await showTime.findById(req.params.id);

    if (!showtime) {
      return res.status(404).json({
        message: "Showtime not found",
      });
    }

    const confirmedBookings = await Booking.countDocuments({
      showtime: showtime._id,
      bookingStatus: "Confirmed",
    });

    if (confirmedBookings > 0) {
      return res.status(400).json({
        message: "Cannot update a showtime with confirmed bookings",
      });
    }

    const {movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity,} = req.body;

    if (movie) {
      const foundMovie = await Movie.findById(movie);

      if (!foundMovie) {
        return res.status(404).json({
          message: "Movie not found",
        });
      }
    }

    const updatedShowtime = await showTime.findByIdAndUpdate(
      req.params.id,
      {
        movie,
        hallNo,
        date,
        startTime,
        endTime,
        ticketPrice,
        totalCapacity,
      },
      {
        returnDocument:'after'
      }
    );
    
    return res.status(200).json({
      message: "Showtime updated successfully",
      showtime: updatedShowtime,
    });
  } catch (error) 
  {
    console.error("Update Showtime Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const deleteShowTimes=async(req:Request,res:Response)=>{
    try {
    const showtime = await showTime.findById(req.params.id);

    if (!showtime) {
      return res.status(404).json({
        message: "Showtime not found",
      });
    }

    const confirmedBookings = await Booking.countDocuments({
      showtime: showtime._id,
      bookingStatus: "Confirmed",
    });

    if (confirmedBookings > 0) {
      return res.status(400).json({
        message: "Cannot delete a showtime with confirmed bookings",
      });
    }

    await showTime.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "Showtime deleted successfully",
    });
  } catch (error) {
    console.error("Delete Showtime Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};







