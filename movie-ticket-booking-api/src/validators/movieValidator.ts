import express,{Request,Response,NextFunction} from "express";
export const validateMovie = (req: Request,res: Response,next: NextFunction) => 
{
    const {title,genre,duration,description,posterUrl,rating,status}=req.body;
    if(!title||!genre||!duration||!description||!posterUrl||rating===undefined||!status)
    {
        return res.status(400).json({
              msg:"You must fill all fields"
        });
    }
    const movieDuration=Number(duration);
    if(Number.isNaN(movieDuration)||movieDuration<=0)
    {
        return res.status(400).json({
            msg: "Duration must be a valid positive number"
        });
    }
    const movieRating=Number(rating);
    if(Number.isNaN(movieRating)||movieRating<0||movieRating>10)
    {
        return res.status(400).json({
            msg: "Rating must be between 0 and 10"
        });
    }
    if(status!=="Now Showing"&&status !== "Coming Soon")
    {
        return res.status(400).json({
            msg: "Status must be Now Showing or Coming Soon"
        });
    }
    next();
};