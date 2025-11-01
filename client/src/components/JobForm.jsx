import React, { useState } from "react";

export default function JobForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    company:  initial.company  ?? "",
    title:    initial.title    ?? "",
    location: initial.location ?? "",
    status:   initial.status   ?? "applied",
    nextStep: initial.nextStep ?? "",
    tags:     Array.isArray(initial.tags) ? initial.tags.join(", ") : (initial.tags ?? ""),
  });
  const [saving, setSaving] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        company:  form.company.trim(),
        title:    form.title.trim(),
        location: form.location.trim(),
        status:   form.status,
        nextStep: form.nextStep.trim(),
        tags:     form.tags.split(",").map(t => t.trim()).filter(Boolean),
      };
      await onSave(payload); // parent handles switching back to list + refresh
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium capitalize">Company</label>
          <input className="input" name="company" value={form.company} onChange={onChange} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium capitalize">Title</label>
          <input className="input" name="title" value={form.title} onChange={onChange} required />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium capitalize">Location</label>
          <input className="input" name="location" value={form.location} onChange={onChange} />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium capitalize">Status</label>
          <select className="select" name="status" value={form.status} onChange={onChange}>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="offer">Offer</option>
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium capitalize">Next Step</label>
        <input className="input" name="nextStep" value={form.nextStep} onChange={onChange} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium capitalize">Tags</label>
        <input className="input" name="tags" value={form.tags} onChange={onChange} placeholder="Backend, Node, Visa" />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" className="btn" disabled={saving}>{saving ? "Saving…" : "Save"}</button>
        <button type="button" className="btn-ghost" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
