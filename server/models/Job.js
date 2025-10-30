// server/models/Job.js
// Central schema for the Job entity. Keep types simple and consistent with frontend.

import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "interviewing", "offer", "rejected"],
      default: "applied",
    },
    // Keep date values as ISO strings to simplify form handling on the client.
    appliedDate: { type: String },
    nextStep: String,
    location: String,
    url: String,
    notes: String,
    tags: [String],
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);
