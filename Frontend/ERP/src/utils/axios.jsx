// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pro-manager-server.vercel.app/api/v1',
    timeout: 40000,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "https://pro-manager-server.vercel.app/",
        "Access-Control-Allow-Headers": "Origin, X- Requested - With, Content- Type, Accept"
    },
    withCredentials: true,
});

export default axiosInstance;


