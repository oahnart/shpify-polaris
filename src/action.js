import api from "./api";

export const postLogin = (data) => {
  return api({
    method: "post",
    url: "users",
    data,
  });
};

export const getListUser = (data) => {
  return api({
    method: "get",
    url: "users",
    data,
  });
};
