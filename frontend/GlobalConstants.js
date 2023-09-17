import { useEffect } from "react";

const GLOBAL_CONSTANTS = {
  backend_url: import.meta.env.VITE_BACKEND_API_URL,
  loggedIn:JSON.parse(localStorage?.getItem("user_data")) ? true : false,
  user_cred:JSON.parse(localStorage?.getItem("user_data"))?.data 
};

export default GLOBAL_CONSTANTS;