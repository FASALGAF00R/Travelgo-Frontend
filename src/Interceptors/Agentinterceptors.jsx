import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_AGENTBACKEND_URL
});


console.log("agent url",import.meta.env.VITE_AGENTBACKEND_URL);


let AgentAccesToken = localStorage.getItem("AgentaccesToken");

instance.defaults.headers.common["Authorization"] = AgentAccesToken ? `Bearer ${AgentAccesToken}` : "";
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    console.log("Request interceptor - Start:", request);
    return request;
  },
  async (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response interceptor - Start:", response);
    return response;
  },

);

export default instance;
