import API from "../constants/api";

export const getParseUrl = (url = "", param = {}) => {
  let append = "";
  Object.keys(param).forEach((key, index) => {
    if (index == 0) append = "?";
    append += key + "=" + param[key] + "&";
  });
  if (append) {
    append = append.substr(0, append.length - 1);
  }
  return url + append;
};
export const $request = ({ url = "", type = "GET", param = {} }) => {
  const token = localStorage.getItem("token");
  if (type == "GET") {
    return new Promise((resolve, reject) => {
      fetch(getParseUrl(API[url], param), {
        method: "GET",
        credentials: "include",
        headers: new Headers({
          "Content-Type": "application/json",
          token
        }),
        mode: "cors"
      })
        .then(res => {
          if (res.headers.get("token")) {
            localStorage.setItem("token", res.headers.get("token"));
          }
          res.json().then(json => {
            if (json.status) {
              resolve(json);
            } else {
              reject(json);
            }
          });
        })
        .catch(res => {
          reject(res);
        });
    });
  } else {
    return new Promise((resolve, reject) => {
      fetch(API[url], {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          token
        },
        body: JSON.stringify(param)
      })
        .then(res => {
          if (res.headers.get("token")) {
            localStorage.setItem("token", res.headers.get("token"));
          }
          res.json().then(json => {
            if (json.status) {
              resolve(json);
            } else {
              reject(json);
            }
          });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
