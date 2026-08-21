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
 *       500:
 *         description: Server error
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
 *         example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Showtime retrieved successfully
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
showtimeRoutes.get("/:id", ShowTimebyID);

/**
 * @swagger
 * /api/showtimes:
 *   post:
 *     summary: Create a new showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movie:
 *                 type: string
 *                 example: 68a123456789abcdef123456
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-01
 *               time:
 *                 type: string
 *                 example: "19:00"
 *     responses:
 *       201:
 *         description: Showtime created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
showtimeRoutes.post(
  "/",
  authMiddleware,
  requireRole,
  ValidateShowtime,
  createShowTimes
);

/**
 * @swagger
 * /api/showtimes/{id}:
 *   patch:
 *     summary: Update a showtime
 *     tags: [Showtimes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-09-02
 *               time:
 *                 type: string
 *                 example: "21:00"
 *     responses:
 *       200:
 *         description: Showtime updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
showtimeRoutes.patch(
  "/:id",
  authMiddleware,
  requireRole,
  ValidateUpdate,
  updateShowTimes
);

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
 *         example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Showtime deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Showtime not found
 *       500:
 *         description: Server error
 */
showtimeRoutes.delete(
  "/:id",
  authMiddleware,
  requireRole,
  deleteShowTimes
);

export default showtimeRoutes;