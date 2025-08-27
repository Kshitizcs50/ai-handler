import axios from "axios";


const REST_API_BASE_URL="http://localhost:8080/groq/chat?prompt=";
export const Groq=()=> axios.get(REST_API_BASE_URL);

export const sendChatPrompt = (prompt) => {
  return axios.post(REST_API_BASE_URL, { prompt });
};