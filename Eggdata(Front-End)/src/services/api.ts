import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to automatically add the User ID header if logged in
api.interceptors.request.use((config) => {
  const savedUser = localStorage.getItem('eggData_user');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    config.headers['X-User-Id'] = user.id;
  }
  return config;
});

export default api;