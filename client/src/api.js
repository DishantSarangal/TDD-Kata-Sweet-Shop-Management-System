import axios from 'axios'
let base = import.meta.env.VITE_API_URL || 
  'https://tdd-kata-sweet-shop-management-system-zyfe.onrender.com';
if (base.endsWith('/')) {
  base = base.slice(0, -1);
}

const api = axios.create({
  baseURL: `${base}/api`
});

// Attach JWT token if available
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
