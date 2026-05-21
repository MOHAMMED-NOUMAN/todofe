import axios from 'axios';

// In development, Vite's proxy rewrites /api → http://localhost:3000/api
// In production (Vercel), there is no proxy, so we must point directly at Render.
// VITE_API_URL is set as an Environment Variable in the Vercel dashboard.
const baseURL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL,
});

export default api;
