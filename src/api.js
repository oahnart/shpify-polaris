import axios from "axios";
import cookie from "js-cookie";
import * as constants from "./constants/constant";
import Qs from "qs";

const request = axios.create();

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function addSubscriber(callback) {
  subscribers.push(callback);
}

request.interceptors.request.use(
  (config) => {
    if (
      config.url.indexOf("/oauth/access_token") !== -1 ||
      config.url.indexOf("/oauth/refresh_token") !== -1 ||
      config.noAuth
    ) {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const refreshToken = cookie.get(constants.REFRESH_TOKEN);

      if (
        refreshToken &&
        !originalRequest._retry &&
        error.config.url.indexOf("/oauth/access_token") === -1
      ) {
        originalRequest._retry = true;
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
        }
        const retryOriginalRequest = new Promise((resolve) => {
          addSubscriber((access_token) => {
            originalRequest.headers.Authorization = "Bearer " + access_token;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      } else {
        subscribers = [];
        // requestLogout();
      }
    }
    return Promise.reject(error.response || { data: {} });
  }
);

const api = (options = {}) => {
  return request({
    baseURL: constants.BASE_URL,
    ...options,
    paramsSerializer: (params) =>
      Qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      Authorization:
        cookie.get(constants.TOKEN) && `Bearer ${cookie.get(constants.TOKEN)}`,
      ...options.headers,
    },
  });
};

export default api;

// import axios from "axios";
// import * as constants from "./constants/constant";
// import Qs from "qs";

// const request = axios.create();

// const api = (options = {}) => {
//   return request({
//     baseURL: constants.BASE_URL,
//     ...options,
//     // paramsSerializer: (params) =>
//     //   Qs.stringify(params, { arrayFormat: "repeat" }),
//     // headers: {
//     //   Authorization:
//     //     cookie.get(constants.TOKEN) && `Bearer ${cookie.get(constants.TOKEN)}`,
//     //   ...options.headers,
//     // },
//   });
// };

// export default api;
