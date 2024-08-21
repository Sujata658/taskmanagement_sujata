import axios from 'axios';


// const baseURL = "https://probable-guacamole-w4vqv94r9j3gj76-5000.app.github.dev/api/v1"

const baseURL = "http://localhost:5000/api/v1"

export const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

function getCookie(name: string): string | null {
    const cookies: string[] = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie: string = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            const cookieValue = cookie.substring(name.length + 1);
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken') || getCookie('accessToken');
        if (config.url !== '/auth/login' && token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (!error.response) {
            error.isNetworkError = true;
        }
        return Promise.reject(error);
    }
);
