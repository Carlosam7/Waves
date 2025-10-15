import API from "./api.js";

const PROJECT_ID = process.env.PROJECT_ID;

export const register = (userData) => {
  return API.post(`/auth/${PROJECT_ID}/signup-direct`, userData, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const login = (userData) => {
  return API.post(`/auth/${PROJECT_ID}/login`, userData, {
    headers: {
      "Content-Type": "application/json",
    },
    Accept: "application/json",
  });
};

export const logout = (token) => {
  return API.post(`/auth/${PROJECT_ID}/logout`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const verifyToken = (token) => {
  try {
    return API.get(`/auth/${PROJECT_ID}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.log(error);
    const status = error.status;
    const err = new Error();
    if (status === 401) {
      err.message = "Invalid or expired token";
      err.statusText = "Unauthorized";
    }
  }
};

export const refreshToken = (rToken) => {
  return API.post(`/auth/${PROJECT_ID}/refresh-token`, {
    refreshToken: rToken,
  });
};
