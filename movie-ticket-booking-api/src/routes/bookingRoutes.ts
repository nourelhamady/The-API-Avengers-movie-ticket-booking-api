import express from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";

import { createBookingValidator } from "../validators/bookingValidator";

const router = express.Router();

//path,callback function
router.post("/",createBooking);
router.get("/",getMyBookings)
router.get("/:id",getBookingById);
router.patch("/:id/cancel",cancelBooking,)

router.post(
  "/",
  createBookingValidator,
  createBooking
);


export default router;