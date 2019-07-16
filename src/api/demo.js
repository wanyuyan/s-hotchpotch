import axios from "./request/axios";

export const mockTest = () => {
  return axios.get("/first-demo", {pageSize: 1})
}