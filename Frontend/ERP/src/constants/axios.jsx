// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
