const rawEnv = (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_URL) || (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL);
export const API_BASE = rawEnv || "http://localhost:5000";

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
