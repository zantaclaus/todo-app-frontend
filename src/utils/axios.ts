import { default as axiosInstance } from 'axios';

const axios = axiosInstance.create({ baseURL: 'http://192.168.64.21:8000' });

export default axios;
