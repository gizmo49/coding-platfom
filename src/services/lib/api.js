import axios from "axios";
import { getCookie } from "../../utils/cookies";


export const httpSignal = axios.CancelToken.source();
const CancelToken = axios.CancelToken;
let requestSignal;

// const BASE_URL = "https://coding-platform-rp5b.onrender.com"; // make provision to read from env 
const BASE_URL = "http://localhost:7077";

const API = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
});

API.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        // config.headers["x-request-client-key"] = CLIENT_KEY; make provision for client key eventually
        const disableAuthorization = config.disableAuthorization;
        if (!disableAuthorization) {
            accessToken &&
                (config.headers["Authorization"] = "Bearer " + accessToken);
        } else {
            delete config?.headers["Authorization"];
        }

        requestSignal = CancelToken.source();
        config.cancelToken = requestSignal.token;
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


export default API;
