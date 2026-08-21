import { Router } from "express";
import { ValidateShowtime,ValidateUpdate } from "../validators/showtimeValidator";
import { createShowTimes,allShowTimes,ShowTimebyID,updateShowTimes,deleteShowTimes } from "../controllers/showtimeController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
const showtimeRoutes=Router()
/**
 * @swagger
 * tags:
 *   name: Showtimes
 *   description: Showtime management APIs
 */

/**
 * @swagger
 * /api/showtimes:
 *   get:
 *     summary: Get all showtimes
 *     tags: [Showtimes]
 *     responses:
 *       200:
 *         description: Showtimes retrieved successfully
 */
showtimeRoutes.get("/", allShowTimes);

/**
 * @swagger
 * /api/showtimes/{id}:
 *   get:
 *     summary: Get showtime by ID
 *     tags: [Showtimes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Showtime found
 *       404:
 *         description: Showtime not found
 */
showtimeRoutes.get("/:id", ShowTimebyID);

/**
 * @swagger
 * /api/showtimes:
 *   post:
 *     summary: Create a showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShowtime'
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
showtimeRoutes.post("/",authMiddleware,requireRole("admin"),ValidateShowtime,createShowTimes);

/**
 * @swagger
 * /api/showtimes/{id}:
 *   patch:
 *     summary: Update a showtime
 *     tags:
 *       - Showtimes
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Showtime ID
 *         schema:
 *           type: string
 *           example: "66c123456789abcdef123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 example: "66c123456789abcdef654321"
 *               hallNo:
 *                 type: number
 *                 example: 2
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-09-15"
 *               startTime:
 *                 type: string
 *                 example: "18:00"
 *               endTime:
 *                 type: string
 *                 example: "21:00"
 *               ticketPrice:
 *                 type: number
 *                 example: 150
 *               totalCapacity:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *       400:
 *         description: Invalid showtime data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Showtime not found
 */
showtimeRoutes.patch("/:id",authMiddleware,requireRole("admin"),ValidateUpdate,updateShowTimes);

/**
 * @swagger
 * /api/showtimes/{id}:
 *   delete:
 *     summary: Delete a showtime
 *     tags: [Showtimes]
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
 *         description: Showtime deleted successfully
 *       400:
 *         description: Cannot delete showtime with confirmed bookings
 *       404:
 *         description: Showtime not found
 */
showtimeRoutes.delete("/:id",authMiddleware,requireRole("admin"),deleteShowTimes);

export default showtimeRoutes;