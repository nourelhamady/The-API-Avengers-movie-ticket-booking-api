import express,{Request,Response,NextFunction} from "express";
//Showtime Validator
export function ValidateShowtime(req:Request,res:Response,next:NextFunction){
    const {movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity}=req.body
    
    if(!movie||hallNo===undefined||!date||!startTime||!endTime||ticketPrice===undefined||totalCapacity===undefined){
         return res.status(400).json({message:"Missing Required Fields"})
    }
    if(ticketPrice<0){
        return res.status(400).json({message:"Ticket Price Cannot be negative"})
    }
    if(totalCapacity<=0){
        return res.status(400).json({message:"Capacity must be more than zero"})
    }
    if(new Date(date)<=new Date()){
        return res.status(400).json({message:"Invalid date"})
    }
    if(startTime>=endTime){
        return res.status(400).json({message:"Invalid time"})
    }
    if(hallNo<=0){
        return res.status(400).json({message:"Hall number must be positive"})
    }
    next()
}
export function ValidateUpdate(req:Request,res:Response,next:NextFunction){
    const {hallNo,date,startTime,endTime,ticketPrice,totalCapacity}=req.body
    if(hallNo!==undefined && hallNo<=0){
        return res.status(400).json({message:"Hall number must be positive"})
    }
    if(date!==undefined && new Date(date)<=new Date()){
        return res.status(400).json({message:"Invalid date"})
    }if(startTime!==undefined && endTime!==undefined){{
         if(startTime>=endTime){
        return res.status(400).json({message:"Invalid time"})
    }}}
    if(ticketPrice!==undefined && ticketPrice<0){
        return res.status(400).json({message:"Ticket Price Cannot be negative"})
    }
    if(totalCapacity!==undefined && totalCapacity<=0){
        return res.status(400).json({message:"Capacity must be more than zero"})
    }
    next()

}