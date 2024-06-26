import axios from 'axios';

export default axios.create({
    baseURL: 'http://146.169.137.54:5000'
    // baseURL: 'http://localhost:3500'
});