import express from "express";
import {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking,
} from "../controllers/bookingController";
import { requireRole } from "../middlewares/roleMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createBookingValidator } from "../validators/bookingValidator";

const bookingRoutes = express.Router();

//path,callback function
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management APIs
 */

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a movie booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBooking'
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Invalid seats, capacity exceeded, or showtime already started
 *       401:
 *         description: Unauthorized
 */
bookingRoutes.post("/",authMiddleware,requireRole("customer"),createBookingValidator,createBooking);

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get current customer's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer bookings retrieved successfully
 *       401:
 *         description: Unauthorized
 */
bookingRoutes.get("/",authMiddleware,requireRole("customer"), getMyBookings);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get booking by ID
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       404:
 *         description: Booking not found
 */
bookingRoutes.get("/:id",authMiddleware,requireRole("customer"), getBookingById);

/**
 * @swagger
 * /api/bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Booking cannot be cancelled
 *       404:
 *         description: Booking not found
 */
bookingRoutes.patch("/:id/cancel",authMiddleware,requireRole("customer"), cancelBooking);


export default bookingRoutes;