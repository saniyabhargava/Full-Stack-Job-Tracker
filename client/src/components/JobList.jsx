import React from "react";

/**
 * JobList: responsive grid of cards with Edit, Delete, and Status change.
 * Simple, clean card layout with generous spacing.
 */
export default function JobList({ jobs, onEdit, onDelete, onStatus }) {
  if (!jobs.length) {
    return (
      <div className="card">
        <div className="card-pad">
          <p className="muted">No Jobs Found. Use “Add Job” To Create Your First Entry.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-grid">
  {jobs.map((j) => (
    <div key={j._id} className="card hover:shadow-lg transition-all duration-200">
      <div className="card-pad space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-brand-lilac capitalize">{j.company}</h3>
            <p className="text-gray-300 capitalize">{j.title}</p>
            {j.location && <p className="text-sm text-gray-400">{j.location}</p>}
          </div>
          <span className="badge bg-gray-800">{j.status}</span>
        </div>

        {j.nextStep && (
          <p className="text-sm text-gray-300">
            <span className="font-medium text-brand-lilac">Next:</span> {j.nextStep}
          </p>
        )}

        {j.tags?.length > 0 && (
          <p className="text-xs text-gray-400">
            <span className="text-gray-300 font-medium">Tags:</span> {j.tags.join(", ")}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button className="btn" onClick={() => onEdit(j)}>Edit</button>
          <button className="btn-ghost" onClick={() => onDelete(j._id)}>Delete</button>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-sm text-gray-300 capitalize">Status</label>
            <select
              value={j.status}
              onChange={(e) => onStatus(j._id, e.target.value)}
              className="select"
            >
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="rejected">Rejected</option>
              <option value="offer">Offer</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

  );
}
