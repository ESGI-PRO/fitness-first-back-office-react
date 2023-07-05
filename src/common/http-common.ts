import axios from "axios";

const API_URL = import.meta.env["VITE_URL_BACKEND"];

const http = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-type": "application/json"
    }
});

export default http;