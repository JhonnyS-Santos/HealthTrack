import axios from "axios";

const API_URL = "http://192.168.18.119:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const select = async () => {
  try {
    const response = await api.get("/users"); // endpoint correto
    return response.data[0]; // retorna o usuário
  } catch (error) {
    console.log(error);
    throw error; // lança erro para o try/catch do registrar capturar
  }
};

export default api;