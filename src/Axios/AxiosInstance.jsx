
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    // baseURL: 'https://louizmizik-server.onrender.com/api',
    withCredentials: true,
});

export default axiosInstance;