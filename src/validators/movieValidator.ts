import { Request, Response, NextFunction } from "express";
//Movie Validator
export const validateMovie = (req: Request,res: Response,next: NextFunction) => 
{
    const {title,genre,duration,description,posterUrl,rating,status} = req.body;

    if (!title ||!genre ||duration === undefined ||!description ||!posterUrl ||rating === undefined ||!status) {
        return res.status(400).json({
            message: "You must fill all fields"
        });
    }

    const movieDuration = Number(duration);

    if (Number.isNaN(movieDuration) || movieDuration <= 0) {
        return res.status(400).json({
            message: "Duration must be a valid positive number"
        });
    }

    const movieRating = Number(rating);

    if (
        Number.isNaN(movieRating) ||
        movieRating < 0 ||
        movieRating > 10
    ) {
        return res.status(400).json({
            message: "Rating must be between 0 and 10"
        });
    }

    if (status !== "Now Showing" &&status !== "Coming Soon") {
        return res.status(400).json({
            message: "Status must be Now Showing or Coming Soon"
        });
    }

    next();
};