import React from "react";

/**
 * Filters: search + status dropdown.
 * Everything is visually spaced and capitalized via utility classes.
 */
export default function Filters({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-4">
      <div className="space-y-1">
        <label className="text-sm font-medium capitalize">Search</label>
        <input
          className="input"
          type="text"
          placeholder="Search Company, Title, Or Tag"
          value={value.q}
          onChange={(e) => onChange({ ...value, q: e.target.value })}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium capitalize">Status</label>
        <select
          className="select"
          value={value.status}
          onChange={(e) => onChange({ ...value, status: e.target.value })}
        >
          <option value="all">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="rejected">Rejected</option>
          <option value="offer">Offer</option>
        </select>
      </div>
    </div>
  );
}
