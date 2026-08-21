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
 *     summary: Create a movie
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMovie'
 *     responses:
 *       201:
 *         description: Movie created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
movieRoutes.post("/",authMiddleware,requireRole("admin"), validateMovie, CreateMovie);

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Search by movie title
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: Filter by genre
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [Now Showing, Coming Soon]
 *         description: Filter by movie status
 *     responses:
 *       200:
 *         description: Movies retrieved successfully
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
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateMovie'
 *     responses:
 *       200:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 */
movieRoutes.put("/:id",authMiddleware,requireRole("admin"), validateMovie, UpdateMovie);


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
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */
movieRoutes.delete("/:id",authMiddleware,requireRole("admin"), DeleteMovie);
export default movieRoutes;