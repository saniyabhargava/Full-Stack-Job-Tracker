import React, { useState } from "react";

/**
 * JobForm component
 * Used for adding and editing job entries.
 * Receives initial data (when editing) and `onSave` / `onCancel` callbacks.
 */
export default function JobForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    company: initial.company || "",
    title: initial.title || "",
    location: initial.location || "",
    status: initial.status || "applied",
    nextStep: initial.nextStep || "",
    tags: initial.tags ? initial.tags.join(", ") : ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean)
    };
    onSave(payload);
  };

  return (
    <form className="card space-y-4" onSubmit={handleSubmit}>
      <input
        name="company"
        placeholder="Company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        name="title"
        placeholder="Role / Position"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location (optional)"
        value={form.location}
        onChange={handleChange}
      />
      <select name="status" value={form.status} onChange={handleChange}>
        <option value="applied">Applied</option>
        <option value="interviewing">Interviewing</option>
        <option value="rejected">Rejected</option>
        <option value="offer">Offer</option>
      </select>
      <input
        name="nextStep"
        placeholder="Next step (e.g. Follow up Tuesday)"
        value={form.nextStep}
        onChange={handleChange}
      />
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={handleChange}
      />

      <div className="flex gap-2">
        <button type="submit">Save</button>
        <button
          type="button"
          className="ghost"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
