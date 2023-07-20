import axios from "axios";

export const makeRequset = axios.create({
    baseURL:"http://localhost:3000/api/",
    withCredentials: true,
});