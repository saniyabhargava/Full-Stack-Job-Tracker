import React from "react";

/**
 * JobList component
 * Displays a list of job cards with Edit, Delete, and status controls.
 */
export default function JobList({ jobs, onEdit, onDelete, onStatus }) {
  if (!jobs.length)
    return <div className="card">No jobs found. Add your first one!</div>;

  return (
    <div className="grid">
      {jobs.map((job) => (
        <div key={job._id} className="card hover:border-blue-500/60 transition">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">{job.company}</h2>
            <span className="badge">{job.status}</span>
          </div>
          <p className="text-gray-400 text-sm">{job.title}</p>
          {job.location && (
            <p className="text-gray-500 text-xs">{job.location}</p>
          )}
          {job.nextStep && (
            <p className="mt-2 text-sm">
              <span className="text-blue-400 font-medium">Next:</span>{" "}
              {job.nextStep}
            </p>
          )}
          {job.tags?.length > 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Tags: {job.tags.join(", ")}
            </p>
          )}

          <div className="flex gap-2 mt-3">
            <button onClick={() => onEdit(job)}>Edit</button>
            <button className="ghost" onClick={() => onDelete(job._id)}>
              Delete
            </button>
            <select
              value={job.status}
              onChange={(e) => onStatus(job._id, e.target.value)}
              className="text-sm ml-auto"
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
