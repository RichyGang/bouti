import axios from "axios";

// export const URL = "https://127.0.0.1:8000"
export const API_URL  = "https://127.0.0.1:8000/api"
export const my_app = axios.create({baseURL: API_URL})


