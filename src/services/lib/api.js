import axios from "axios";
import { getCookie } from "../../utils/cookies";


export const httpSignal = axios.CancelToken.source();
const CancelToken = axios.CancelToken;
let requestSignal;

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
