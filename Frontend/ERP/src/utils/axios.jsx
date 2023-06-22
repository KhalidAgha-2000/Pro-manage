// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pro-manager-server.vercel.app/api/v1',
    timeout: 40000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "https://pro-manager-server.vercel.app/",
        "Access-Control-Allow-Headers": "Origin, X- Requested - With, Content- Type, Accept"
    },
});

export default axiosInstance;


