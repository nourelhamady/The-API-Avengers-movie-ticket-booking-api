import Movie from "../models/Movie";
import {Request,Response} from "express";
//Customers & Admins
export const GetAllMovies=async (req:Request,res:Response)=>
{
    try
    {
       const {title,genre,status}=req.query;
       const filter:any={};
       if(title)
       {
         filter.title=title;
       }
       if(genre)
       {
          filter.genre=genre;
       }
       if(status)
       {
        filter.status=status;
       }
        const all=await Movie.find(filter);
        return res.status(200).json(all);
    }
    catch(error)
    {
        return res.status(500).json({
            msg:"Server Error"
        });
    }
   
};
export const GetOneMovie=async (req:Request,res:Response)=>
{
    try
    {
      const movie_id=req.params.id;
      const onemovie=await Movie.findById(movie_id);
      if(!onemovie)
        {
            return res.status(404).json(
                {
                    msg:"Movie not Found"
                }
            );
        } 
      return res.status(200).json(onemovie);

    }
    catch(error)
    {
         return res.status(500).json({
            msg:"Server Error"
        });
    }
};
//Admins
export const UpdateMovie=async (req:Request,res:Response)=>
{
    try
    {
      const movie_id=req.params.id;
      const {title,genre,duration,description,posterUrl,rating,status}=req.body;
      const updatemovie=await Movie.findOneAndUpdate(
        {_id:movie_id},
        {title,genre,duration,description,posterUrl,rating,status},
        {new:true}
      );
      if(!updatemovie)
        {
            return res.status(404).json(
                {
                    msg:"Movie not Found"
                }
            );
        } 
      return res.status(200).json(updatemovie);

    }
    catch(error)
    {
         return res.status(500).json({
            msg:"Server Error"
        });
    }
    
};
export const DeleteMovie=async (req:Request,res:Response)=>
{
    try
    {
      const movie_id=req.params.id;
      const deletedmovie=await Movie.findByIdAndDelete(movie_id);
      if(!deletedmovie)
        {
            return res.status(404).json(
                {
                    msg:"Movie not Found"
                }
            );
        } 
      return res.status(200).json(
        {
            msg:"Movie deleted successfully"
        }
      );

    }
    catch(error)
    {
         return res.status(500).json({
            msg:"Server Error"
        });
    }
};
export const CreateMovie=async (req:Request,res:Response)=>
{
   try
   {
      const {title,genre,duration,description,posterUrl,rating,status}=req.body;
      const NewMovie=new Movie(
        {
            title,
            genre,
            duration,
            description,
            posterUrl,
            rating,
            status
        }
    );
    
      await NewMovie.save();
      return res.status(201).json({
        msg:"Movie Created Successfully"
      });
   } 
    catch(error)
    {
        return res.status(500).json({
            msg:"Server Error"
        });
    }


};