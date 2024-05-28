import { handleErrorResponse } from "./common";
import axios from "axios";
import { getAccessJWT } from "./TokenServices";
import { BACKEND_BASE_URL, ACCESS_TOKEN } from "@pages/api/env";

export const makeUrl = url => {
  let BACKEND_URL = BACKEND_BASE_URL;
  if (!url.includes("http")) return BACKEND_URL + "/" + url;
  return url;
};

export const makeFileURL = function (URL) {
  return URL;
};

export const getAPI = (url, params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axios.get(makeUrl(url), {
        headers: {
          Authorization: accessJWT || undefined,
          "x-access-token": ACCESS_TOKEN || undefined,
        },
        params,
      });
      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const postAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axios.post(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          "x-access-token": ACCESS_TOKEN || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};
export const postAPIFile = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axios.post(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          "x-access-token": ACCESS_TOKEN || undefined,
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const postAPIWL = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axiosWithoutLoader.post(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          "x-access-token": ACCESS_TOKEN || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error);
    }
  });
};

export const putAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axios.put(makeUrl(url), formData, {
        headers: {
          Authorization: accessJWT || undefined,
          "x-access-token": ACCESS_TOKEN || undefined,
        },
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};

export const deleteAPI = (url, formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = getAccessJWT();
      const res = await axios.delete(makeUrl(url), {
        headers: { Authorization: accessJWT || undefined, "x-access-token": ACCESS_TOKEN || undefined },
        formData,
      });

      resolve(res.data);
    } catch (error) {
      handleErrorResponse(error);
      reject(error.message);
    }
  });
};
