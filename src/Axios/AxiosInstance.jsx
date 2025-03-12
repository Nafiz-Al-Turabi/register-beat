
import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:3001/api',
    baseURL: 'http://backend.beatprotect.io/api',
     //baseURL: 'https://louizmizik-server.onrender.com/api',
    //baseURL: 'https://phpstack-1408986-5240724.cloudwaysapps.com/api',
    withCredentials: true,
});

export default axiosInstance;