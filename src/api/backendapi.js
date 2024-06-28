import axios from 'axios';

export default axios.create({
    baseURL: 'http://[backendipaddress]:5000'
    // baseURL: 'http://localhost:3500'
});