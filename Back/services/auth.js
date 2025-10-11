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

export const verifyToken = async (token) => {
  try {
    const response = await API.get(`/auth/${PROJECT_ID}/verify-token`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    const err = new Error(
      error.response?.status === 401 ? "Expired token" : "Error verifying token"
    );
    err.status = error.response?.status || 500;
    err.statusText = error.response?.statusText;
    throw err;
  }
};

export const refreshToken = (rToken) => {
  return API.post(`/auth/${PROJECT_ID}/refresh-token`, {
    refreshToken: rToken,
  });
};
