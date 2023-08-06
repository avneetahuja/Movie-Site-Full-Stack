import express from "express";
import cors from "cors";
import reviews from "./api/reviews.route.js"

const app = express();

app.use(cors());
app.use(express.json()); // ability for app to read json requests

app.use("/api/v1/reviews", reviews) //you can use any url here but this is best practice
app.use("*", (req, res) => res.status(404).json({erroor: "not found"}));

export default app