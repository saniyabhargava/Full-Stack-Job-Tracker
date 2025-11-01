// Unified API client with clear errors and a safe BASE url resolver.
const BASE =
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "")) ||
  "http://localhost:4000"; // fallback for local dev

async function request(path, options = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000); // 15s safety timeout

  try {
    const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      signal: controller.signal,
      ...options,
    });

    // Try to parse json even for non-2xx to get error details
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || res.statusText || "Request failed";
      const err = new Error(msg);
      err.status = res.status;
      err.response = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(id);
  }
}

export function listJobs(params = {}) {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.status && params.status !== "all") qs.set("status", params.status);
  const q = qs.toString();
  return request(`/api/jobs${q ? `?${q}` : ""}`);
}

export function createJob(payload) {
  return request(`/api/jobs`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateJob(id, payload) {
  return request(`/api/jobs/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteJob(id) {
  return request(`/api/jobs/${id}`, { method: "DELETE" });
}

export function updateStatus(id, status) {
  return request(`/api/jobs/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
