import { default as axiosInstance } from 'axios';

const axios = axiosInstance.create({ baseURL: 'http://localhost:8000' });

export default axios;
