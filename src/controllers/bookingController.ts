import {Request,Response} from "express";
import {authRequest,authPayload} from "../middlewares/authMiddleware";
import Booking from "../models/Booking";
import {showTime} from "../models/Showtime";
import { validationResult } from "express-validator";

export const createBooking = async (req:Request, res:Response)=>{
    try{
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
             
        }


        const {showtime,selectedSeats}=req.body;

        if(!showtime || !selectedSeats){
            return res.status(400).json({
                message: "Showtime and selected seats are required"
            });
        }
        if(!Array.isArray(selectedSeats)||selectedSeats.length===0){
            return res.status(400).json({
                message:"Please select at least one seat"
            });
        }

        const uniqueSeats = new Set(selectedSeats);

        if(uniqueSeats.size!==selectedSeats.length){
            return res.status(400).json({
                message: "Duplicate seats are not allowed"
            });
        }

        const foundShowtime = await showTime.findById(showtime);

        if(!foundShowtime){
            return res.status(404).json({
                message: "Showtime not found"
            });
        }
        const showtimeDate = new Date(foundShowtime.date);

        const [hours, minutes] = foundShowtime.startTime.split(":").map(Number);

        showtimeDate.setHours(hours, minutes, 0, 0);

        if (showtimeDate <= new Date()) {
          return res.status(400).json({
        message: "Cannot book a showtime that has already started"
        });
        }
       const availableSeats =foundShowtime.totalCapacity - foundShowtime.bookedSeats.length;
      if (selectedSeats.length > availableSeats) {
      return res.status(400).json({
        message: "Not enough available seats"
      });
      }
        const isSeatBooked = selectedSeats.some((seat:string)=>
            foundShowtime.bookedSeats.includes(seat)
        );

        if(isSeatBooked){
            return res.status(400).json({
                message: "One or more selected seats are already booked"
            });
        }

        const totalPrice = foundShowtime.ticketPrice*selectedSeats.length;

        const booking = await Booking.create({
            customer: (req as authRequest).user.userId,
            showtime,
            selectedSeats,
            totalPrice,
            bookingStatus: "Pending"

        });

        foundShowtime.bookedSeats.push(...selectedSeats);
        await foundShowtime.save();

        return res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

};

export const getMyBookings = async (req:Request,res:Response)=>{
    try{
        const customerId =(req as authRequest).user.userId;
        const bookings =await Booking.find({customer: customerId,}).populate("Showtime");

        return res.status(200).json({
            bookings
        });

    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

};

export const getBookingById = async (req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const booking = await Booking.findById(id).populate("Showtime");

        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            });
        }

        if(booking.customer.toString()!==(req as authRequest).user.userId){ //converting
            return res.status(403).json({
                message:"Access denied"
            });
        } 

        return res.status(200).json({
            booking
        });

    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }


};

export const cancelBooking = async (req:Request,res:Response)=>{
    try{
        const {id} = req.params;
        const booking = await Booking.findById(id);//finding booking

        if(!booking){
             return res.status(404).json({
                message: "Booking not found"
            });
        }
        if (booking.bookingStatus === "Cancelled") {
          return res.status(400).json({
          message: "Booking is already cancelled"
        });
        }
        if(booking.customer.toString()!==(req as authRequest).user.userId){
            return res.status(403).json({
                message: "Access denied"
            });
        }
        const showtime = await showTime.findById(booking.showtime);//finding showtime
        if (!showtime) {
         return res.status(404).json({
         message: "Showtime not found"
        });
        }
        const showtimeDate = new Date(showtime.date);
        const [hours, minutes] = showtime.startTime.split(":").map(Number);
        showtimeDate.setHours(hours, minutes, 0, 0);
        if (showtimeDate <= new Date()) {
              return res.status(400).json({
             message: "Cannot cancel a booking after the movie has started"
            });
        }
        
        showtime.bookedSeats=showtime.bookedSeats.filter(
            (seat:string)=>!booking.selectedSeats.includes(seat)

        );

        await showtime.save();

        booking.bookingStatus = "Cancelled";
        await booking.save();

        return res.status(200).json({
            message:"Booking cancelled Successfully",
            booking
        });


    }catch(error){
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

};