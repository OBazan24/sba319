import express from "express";
import moviesRoutes from "./routes/movies.mjs";

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parsing incoming request bodies as JSON
app.use("/movies", moviesRoutes); // Mounting movies routes

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
