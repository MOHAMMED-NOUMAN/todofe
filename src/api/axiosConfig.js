import axios from 'axios';

// In development (npm run dev), Vite's proxy handles /api → localhost:3000
// In production (Vercel), there's no proxy so we must hit Render directly.
//
// Priority:
//   1. VITE_API_URL env var (set in Vercel dashboard, baked at build time)
//   2. Hardcoded Render URL (fallback if env var is missing)
//   3. '' (empty — for local dev where the Vite proxy handles it)
const RENDER_BACKEND = 'https://todofsd-4.onrender.com';

const isProduction = import.meta.env.PROD; // true when `vite build` was used
const baseURL = import.meta.env.VITE_API_URL || (isProduction ? RENDER_BACKEND : '');

console.log(`[axios] mode=${import.meta.env.MODE} baseURL="${baseURL}"`);

const api = axios.create({
  baseURL,
});

export default api;
