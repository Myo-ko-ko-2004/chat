import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const BackendApi = "http://localhost:5000";
