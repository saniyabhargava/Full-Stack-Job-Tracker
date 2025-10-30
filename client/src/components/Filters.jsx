import React from "react";

/**
 * Filters component
 * Provides a search box and a dropdown to filter jobs by status.
 * The parent (App.jsx) passes `value` and `onChange` props.
 */
export default function Filters({ value, onChange }) {
  return (
    <div className="card mb-6">
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search company, title, or tag..."
        className="mb-3"
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
      />

      {/* Status dropdown */}
      <select
        value={value.status}
        onChange={(e) => onChange({ ...value, status: e.target.value })}
      >
        <option value="all">All statuses</option>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
      </select>
    </div>
  );
}
