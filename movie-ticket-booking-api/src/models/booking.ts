import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    showtime:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Showtime",
        required:true,
    },
    selectedSeats:{
        type:[String],
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
    bookingStatus:{
        type:String,
        enum:["Pending","Confirmed","Cancelled"],
        default:"Pending",
    },

});

const Booking = mongoose.model("Booking",BookingSchema);

export default Booking;