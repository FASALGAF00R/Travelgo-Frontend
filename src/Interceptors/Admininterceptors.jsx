
import axios from "axios";
const instance = axios.create({
  baseURL:import.meta.env.VITE_ADMINBACKEND_URL
});

console.log("vannyyey");

let AdminAccesToken = localStorage.getItem("AdminaccesToken");
console.log(AdminAccesToken,"kllklklklklklk");

instance.defaults.headers.common["Authorization"] = AdminAccesToken ? `Bearer ${AdminAccesToken}` : "";
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
  async (error) => {
    console.error("Response error:", error.response);
    if (error.response && error.response.status === 401) {
      try {
        console.log("work");
        const refreshedTokenResponse = await instance.post('/refreshtoken', { refreshToken: localStorage.getItem('AdminrefreshToken') });
        const newAccessToken = refreshedTokenResponse.data.accessToken;
        console.log("success");
        localStorage.setItem('newaccessToken', newAccessToken);
       
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios.request(error.config);
      } catch (refreshError) {
      // Refresh token failed or expired, redirect to login page
      console.error("Error refreshing access token:", refreshError);
      // Redirect to login page or handle error accordingly
      }
    }
    return Promise.reject(error);
  }
);


export default instance;