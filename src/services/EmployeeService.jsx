import axios from "axios";


const REST_API_BASE_URL="https://ai-handler-backend-production.up.railway.app/groq/chat?prompt=";
export const Groq=()=> axios.get(REST_API_BASE_URL);

export const sendChatPrompt = (prompt) => {
  return axios.post(REST_API_BASE_URL, { prompt });
};