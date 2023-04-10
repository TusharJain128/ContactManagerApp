import axios from "axios";

import { appConfig } from "../config/config";

export async function getContacts() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  };
  const res = await axios.get(`${appConfig.API_URL}/api/contact`, config);
  return res;
}

export async function getReviews() {}
