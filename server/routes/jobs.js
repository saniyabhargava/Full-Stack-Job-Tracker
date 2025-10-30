// server/routes/jobs.js
// REST endpoints for Job. Includes a PATCH route for quick status updates.

import express from "express";
import Job from "../models/Job.js";

const router = express.Router();

// GET /api/jobs?q=&status=
// Basic server-side filtering to keep client simple and URLs shareable.
router.get("/", async (req, res) => {
  const { q, status } = req.query;
  const filter = {};

  if (q) {
    const rx = new RegExp(q, "i");
    filter.$or = [{ company: rx }, { title: rx }, { tags: rx }];
  }
  if (status && status !== "all") {
    filter.status = status;
  }

  const jobs = await Job.find(filter).sort({ createdAt: -1 });
  res.json(jobs);
});

// GET /api/jobs/:id
router.get("/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ error: "Not found" });
  res.json(job);
});

// POST /api/jobs
router.post("/", async (req, res) => {
  try {
    // Basic guard: company + title must be present (schema enforces this too).
    if (!req.body.company || !req.body.title) {
      return res.status(400).json({ error: "company and title are required" });
    }
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PUT /api/jobs/:id
// Full updates via edit form.
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!job) return res.status(404).json({ error: "Not found" });
    res.json(job);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// PATCH /api/jobs/:id/status
// Fast path to change only the status from the list card.
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowed = ["applied", "interviewing", "offer", "rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!job) return res.status(404).json({ error: "Not found" });
  res.json(job);
});

// DELETE /api/jobs/:id
router.delete("/:id", async (req, res) => {
  const out = await Job.findByIdAndDelete(req.params.id);
  if (!out) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
});

export default router;
