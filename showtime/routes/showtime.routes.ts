import { Router } from "express";
import { ValidateShowtime,ValidateUpdate } from "../middlewares/showtime.middleware";
import { createShowTimes,allShowTimes,ShowTimebyID,updateShowTimes,deleteShowTimes } from "../controllers/showtime.controller";
//import {authenticate} from "../middlewares/authMiddleware"
//import{auhtorize} from"../middlewares/roleMiddleware"

const router=Router()
router.get("/",allShowTimes)
router.get("/:id",ShowTimebyID)
router.post("/",/**authenticate,authorize,*/ ValidateShowtime,createShowTimes)
router.patch("/:id"/**authenticate,authorize,*/,ValidateUpdate,updateShowTimes)
router.delete("/:id",/**authenticate,authorize,*/deleteShowTimes)

export default router;