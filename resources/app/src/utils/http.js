import axios from 'axios';

const http = axios.create({
    timeout: 10000,
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    withCredentials: true, // don't send cookies when cross-domain requests
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
});

const authRequestInterceptor = http.interceptors.request.use(
    config => {
        const access_token = sessionStorage.getItem('access_token');
        config.headers.Authorization = `Bearer ${access_token}`;
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default http;
export { authRequestInterceptor };

