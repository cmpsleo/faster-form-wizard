import axios from "axios";

export const client = axios.create({
  baseURL: "https://run.mocky.io/v3",
});
