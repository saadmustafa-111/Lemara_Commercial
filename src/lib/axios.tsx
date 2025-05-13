import axios, { AxiosInstance, AxiosError } from "axios";

// Create a custom axios instance with retry capability
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.24:3000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // Reduced timeout to fail faster (10 seconds)
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    // If token exists, add it to the authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle 401 errors (unauthorized)
    if (error.response && error.response.status === 401) {
      // If we get a 401 and we're not on the login page, we should redirect to login
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/signin')) {
        // Clear any stored authentication data
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        
        // Redirect to login page
        window.location.href = '/signin';
        
        console.log('Unauthorized access detected, redirecting to login page');
      }
    }
    
    // Handle network errors
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT' || !error.response) {
      console.error('Network error detected:', error.message);
      
      // You could implement additional handling for network errors here
      // For example, you could show a notification to the user
      if (typeof window !== 'undefined') {
        console.log('API is unreachable. Falling back to local handling.');
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
