import axios from "axios";

const API = axios.create({
  baseURL: process.env.PROJECT_URL,
});

export default API;