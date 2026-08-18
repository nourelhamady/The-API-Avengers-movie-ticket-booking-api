import express,{Application} from "express"
import Showtimerouter from './routes/showtime.routes'
import{setServers} from "node:dns/promises"
setServers(["1.1.1.1","8.8.8.8"]);
import { connectDB } from "./config/db.js";
import "dotenv/config";



const app:Application=express()
const port=process.env.PORT||3000
app.use(express.json())
app.use("/showtimes",Showtimerouter)
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Server Starting http://localhost:${port}`)
    })
})

