import axios from "axios";

import appConfig from "../config/app.config";

const { baseUrl } = appConfig.api;

const axiosNonAuth = () => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const axiosWithAuth = (token: string) => {
  return axios.create({
    baseURL: baseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { axiosNonAuth, axiosWithAuth };
