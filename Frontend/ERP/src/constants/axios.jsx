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


// Validation
var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const checkIfEmpty = (obj, email) => {
    let status = false
    for (let key in obj) {
        if (obj[key] === "" || !validRegex.test(email)) {
            // if (obj[key] === "" || !validRegex.test(formValues.email)) {
            status = true
        }
    }
    return status;
}
