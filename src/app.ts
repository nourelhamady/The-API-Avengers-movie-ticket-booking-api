import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movieRoutes";
import authorRoutes from "./routes/authRoutes";
import showtimeRoutes from "./routes/showtimeRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import {requireRole} from "./middlewares/roleMiddleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

dotenv.config();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Movie Ticket Booking API is running",
  });
});

app.use("/api/movies", movieRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/showtimes", showtimeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", requireRole);

export default app;