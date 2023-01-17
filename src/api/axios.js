import axios from "axios";

// Developement
// export const BASE_URL = "http://localhost:8080/api/";
// export const ADMIN_PANEL_URL = "http://localhost:8000";

// Production
export const BASE_URL = "https://nft-apis.nftwatcher.net/api/";
export const ADMIN_PANEL_URL = "https://admin.nftwatcher.net/public/";

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
