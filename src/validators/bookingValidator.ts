import { body } from "express-validator";
//Booking Validator
export const createBookingValidator = [
  body("showtime")
    .notEmpty()
    .withMessage("Showtime is required")
    .isMongoId()
    .withMessage("Invalid showtime ID"),

  body("selectedSeats")
    .isArray({ min: 1 })
    .withMessage("Please select at least one seat"),

  body("selectedSeats.*")
    .isString()
    .withMessage("Each seat must be a string")
    .notEmpty()
    .withMessage("Seat cannot be empty"),
];