import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://pro-manage-server.vercel.app/api/v1',
    timeout: 40000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;


