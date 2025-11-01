import { useEffect, useState } from "react";
import Filters from "./components/Filters.jsx";
import JobForm from "./components/JobForm.jsx";
import JobList from "./components/JobList.jsx";
import {
  listJobs,
  createJob,
  updateJob as apiUpdate,
  deleteJob as apiDelete,
  updateStatus as apiUpdateStatus,
} from "./api.js";

export default function App() {
  const [mode, setMode] = useState("list"); // list | add | edit
  const [editing, setEditing] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null); // success/error banner

  // filters
  const [searchQ, setSearchQ] = useState("");
  const [filters, setFilters] = useState({ q: "", status: "all" });

  // debounce search into filters.q
  useEffect(() => {
    const id = setTimeout(() => setFilters((s) => ({ ...s, q: searchQ })), 250);
    return () => clearTimeout(id);
  }, [searchQ]);

  // read list
  const load = async () => {
    setLoading(true);
    try {
      const data = await listJobs({
        q: filters.q || undefined,
        status: filters.status || undefined,
      });
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      setNotice({ type: "error", text: `Failed to load jobs: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [filters.q, filters.status]);

  // helpers
  const done = (msg) => {
    setEditing(null);
    setMode("list");
    setNotice(msg ? { type: "success", text: msg } : null);
  };

  // CRUD
  const handleAdd = async (payload) => {
    try {
      await createJob(payload);
      await load();
      done("Job added.");
    } catch (err) {
      setNotice({ type: "error", text: `Add failed: ${err.message}` });
    }
  };

  const handleSaveEdit = async (payload) => {
    try {
      await apiUpdate(editing._id, payload);
      await load();
      done("Job updated.");
    } catch (err) {
      setNotice({ type: "error", text: `Update failed: ${err.message}` });
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDelete(id);
      await load();
      setNotice({ type: "success", text: "Job deleted." });
    } catch (err) {
      setNotice({ type: "error", text: `Delete failed: ${err.message}` });
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await apiUpdateStatus(id, status);
      await load();
    } catch (err) {
      setNotice({ type: "error", text: `Status change failed: ${err.message}` });
    }
  };

  return (
    <div className="page">
      <header className="border-b border-gray-700">
        <div className="shell py-5 flex items-center justify-between gap-4">
         <h1 className="section-title leading-tight">
  Job Tracker
  <span className="block sm:inline text-gray-400 font-normal text-base sm:text-lg ml-1">
    – Turn Chaos into Clarity.
  </span>
</h1>

          <div className="flex items-center gap-3">
            <span className="badge">Total: {jobs.length}</span>
            {mode === "list" && (
              <button className="btn" onClick={() => { setEditing(null); setMode("add"); }}>
                Add Job
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="shell space-y-6">
        {notice && (
          <div
            className={`card ${notice.type === "error" ? "border-red-400" : "border-emerald-400"}`}
          >
            <div className="card-pad">
              {notice.text}
            </div>
          </div>
        )}

        {mode === "list" && (
          <>
            <div className="card">
              <div className="card-pad">
                <Filters
                  value={{ q: searchQ, status: filters.status }}
                  onChange={(v) => {
                    setSearchQ(v.q);
                    setFilters((s) => ({ ...s, status: v.status }));
                  }}
                />
              </div>
            </div>

            {loading ? (
              <div className="card"><div className="card-pad">Loading…</div></div>
            ) : (
              <JobList
                jobs={jobs}
                onEdit={(j) => { setEditing(j); setMode("edit"); }}
                onDelete={handleDelete}
                onStatus={handleStatusChange}
              />
            )}
          </>
        )}

        {(mode === "add" || mode === "edit") && (
          <div className="card">
            <div className="card-pad">
              <div className="flex items-center justify-between mb-4">
                <h2 className="section-title">{mode === "add" ? "Add Job" : "Edit Job"}</h2>
                <button className="btn-ghost" onClick={() => { setEditing(null); setMode("list"); }}>
                  Cancel
                </button>
              </div>
              <JobForm
                initial={mode === "edit" ? editing : {}}
                onSave={mode === "add" ? handleAdd : handleSaveEdit}
                onCancel={() => { setEditing(null); setMode("list"); }}
              />
            </div>
          </div>
        )}

        <p className="muted">Tip: Use the search and status filter to narrow results.</p>
      </main>
    </div>
  );
}
