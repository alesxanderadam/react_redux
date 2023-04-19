import axios from "axios"
import { history } from "../app"
import { message } from "antd"
const TokenCybersoft = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udGVuZCA3MyIsIkhldEhhblN0cmluZyI6IjMwLzA1LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4NTQwNDgwMDAwMCIsIm5iZiI6MTY1OTg5MTYwMCwiZXhwIjoxNjg1NTUyNDAwfQ.-poI4CYh8bBsN-xbPHgcbNrVnKw1fA1r4IuZCUk0rmA'

export const DOMAIN: string = 'https://shop.cyberlearn.vn'
export const ACCESS_TOKEN: string = "accessToken"
export const USER_LOGIN: string = "userLogin"
export const USER_PROFILE: string = "userProfile"
export const TOTAL_QUATITY: string = "totalQuatity"
export const PRODUCT_CARD: string = "productCard"

export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 100000,
});

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        Authorization: ` Bearer ${settings.getStore(ACCESS_TOKEN)} `,
        TokenCybersoft
    }
    return config;
}, (err) => {
    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    return response
}, (error) => {
    try {
        if (error.response?.status === 400 || error.response?.status === 404) {
            if (error.response?.status === 400) {
                return message.warning(error.response.data.message)
            }
            if (error.response?.status === 404) {
                return message.error(error.response.data.message)
            }
        }
        console.log(error.response)
        return Promise.reject(error)
    } catch (err) {
        console.log(err)
    }
})


export const settings = {
    setStorageJson: (name: string, data: any): void => {
        data = JSON.stringify(data);
        localStorage.setItem(name, data);
    },
    setStorage: (name: string, data: string): void => {
        localStorage.setItem(name, data)
    },
    getStorageJson: (name: string): any | undefined => {
        if (localStorage.getItem(name)) {
            const dataStore: string | undefined | null = localStorage.getItem(name);
            if (typeof dataStore == 'string') {
                const data = JSON.parse(dataStore);
                return data;
            }
            return undefined;
        }
        return; //undefined
    },
    getStore: (name: string): string | null | undefined | boolean | any => {
        if (localStorage.getItem(name)) {
            const data: string | null | undefined = localStorage.getItem(name);
            return data;
        }
        return; //undefined
    },
    setCookieJson: (name: string, value: any, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        value = JSON.stringify(value);
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookieJson: (name: string): any => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
        }
        return null;
    },
    setCookie: (name: string, value: string, days: number): void => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    getCookie: (name: string): string | null => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    eraseCookie: (name: string): void => {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    },
    clearStorage: (name: string) => {
        localStorage.removeItem(name);
    }

}

