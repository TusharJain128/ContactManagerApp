import axios from "axios";

import { appConfig } from "../config/config";

export default async function getContacts() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": localStorage.getItem("x-api-key"),
    },
  };
  const res = await axios.get(`${appConfig.API_URL}/api/contact/getContacts`, config);
  return res;
}

