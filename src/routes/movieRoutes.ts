import {Router}from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";
import { validateMovie } from "../validators/movieValidator";
import { GetAllMovies,GetOneMovie,CreateMovie,UpdateMovie,DeleteMovie } from "../controllers/movieController";
const movieRoutes=Router();
/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie management APIs
 */

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               duration:
 *                 type: integer
 *                 example: 148
 *               releaseYear:
 *                 type: integer
 *                 example: 2010
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
movieRoutes.post("/",authMiddleware,requireRole, validateMovie, CreateMovie);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
 *       500:
 *         description: Server error
 */
movieRoutes.get("/", GetAllMovies);

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Get movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a123456789abcdef123456
 *     responses:
 *       200:
 *         description: Movie retrieved successfully
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRoutes.get("/:id", GetOneMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   put:
 *     summary: Update a movie
 *     tags: [Movies]
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
 *               title:
 *                 type: string
 *                 example: Inception Updated
 *               genre:
 *                 type: string
 *                 example: Sci-Fi
 *               duration:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRoutes.put("/:id",authMiddleware,requireRole, validateMovie, UpdateMovie);

/**
 * @swagger
 * /api/movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags: [Movies]
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
 *         description: Movie deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Movie not found
 *       500:
 *         description: Server error
 */
movieRoutes.delete("/:id",authMiddleware,requireRole, DeleteMovie);
export default movieRoutes;