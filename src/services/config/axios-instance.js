import Axios from "axios";
import interceptors from "@/services/config/axios-interceptors";

const { onRequest } = interceptors;
const baseURL = "https://jsonplaceholder.typicode.com";

const getAxiosInstance = () => {
  let axiosInstance = Axios.create({ baseURL });

  axiosInstance.interceptors.request.use(onRequest);

  return axiosInstance;
};

export default getAxiosInstance;
