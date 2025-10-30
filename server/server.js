// server/server.js
// Minimal Express + Mongoose bootstrap with clear logs and CORS enabled.
// Reads PORT and MONGODB_URI from .env (never commit .env).

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import jobsRouter from "./routes/jobs.js";

const app = express();

// Allow browser clients to call the API from a different origin during dev and prod.
// In production, you can restrict origin: ["https://your-site.netlify.app"]
app.use(cors({ origin: true, credentials: true }));

// Parse JSON bodies.
app.use(express.json());

// HTTP request logs.
app.use(morgan("dev"));

// Simple health check.
app.get("/", (_req, res) => res.send("Job Tracker API "));

// Main resource routes.
app.use("/api/jobs", jobsRouter);

// Boot the server after successful DB connection.
const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(` API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
