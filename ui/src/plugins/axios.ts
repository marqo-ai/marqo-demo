import axios from "axios";


export const appAxios = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/api`,
})