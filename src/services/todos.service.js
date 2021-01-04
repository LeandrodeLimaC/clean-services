import getAxiosInstance from "@/services/config/axios-instance";

const axios = getAxiosInstance();

export const getTodo = async ({ id }) => {
  const { data } = await axios.get(`/todos/${id}`);
  return data;
};

export const getAllTodos = async () => {
  const { data } = await axios.get(`/todos/`);
  return data;
};
