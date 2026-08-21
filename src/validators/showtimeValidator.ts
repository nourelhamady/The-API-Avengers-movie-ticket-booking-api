import { Request, Response, NextFunction } from "express";
//Showtime validator
export function ValidateShowtime(req: Request,res: Response,next: NextFunction) {
    const {movie,hallNo,date,startTime,endTime,ticketPrice,totalCapacity} = req.body;

    if (!movie ||hallNo === undefined ||!date ||!startTime ||!endTime ||ticketPrice === undefined ||totalCapacity === undefined) {
        return res.status(400).json({
            message: "Missing Required Fields"
        });
    }

    if (ticketPrice < 0) {
        return res.status(400).json({
            message: "Ticket Price Cannot be negative"
        });
    }

    if (totalCapacity <= 0) {
        return res.status(400).json({
            message: "Capacity must be more than zero"
        });
    }

    const showtimeDate = new Date(date);
    const [hours, minutes] = startTime.split(":").map(Number);
    showtimeDate.setHours(hours, minutes, 0, 0);
    if (showtimeDate <= new Date()) {
        return res.status(400).json({
            message: "Showtime must be in the future"
        });
    }

    if (startTime >= endTime) {
        return res.status(400).json({
            message: "Invalid time"
        });
    }

    if (hallNo <= 0) {
        return res.status(400).json({
            message: "Hall number must be positive"
        });
    }

    next();
}

export function ValidateUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const {
        hallNo,
        date,
        startTime,
        endTime,
        ticketPrice,
        totalCapacity
    } = req.body;

    if (hallNo !== undefined && hallNo <= 0) {
        return res.status(400).json({
            message: "Hall number must be positive"
        });
    }

    if (date !== undefined) {
        const updateDate = new Date(date);

        if (updateDate <= new Date()) {
            return res.status(400).json({
                message: "Invalid date"
            });
        }
    }

    if (startTime !== undefined &&endTime !== undefined &&startTime >= endTime) {
        return res.status(400).json({
            message: "Invalid time"
        });
    }

    if (ticketPrice !== undefined && ticketPrice < 0) {
        return res.status(400).json({
            message: "Ticket Price Cannot be negative"
        });
    }

    if (totalCapacity !== undefined && totalCapacity <= 0) {
        return res.status(400).json({
            message: "Capacity must be more than zero"
        });
    }

    next();
}