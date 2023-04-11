import axios from "axios";

import { appConfig } from "../config/config";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default async function deleteContact(id) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": localStorage.getItem("x-api-key"),
    },
  };
  await axios.delete(`${appConfig.API_URL}/api/contact/deleteContact/${id}`, config)
  .then((res) => {
    return <Redirect to= '/'/>;
  })
  .catch((err) => {
    alert(err.response.data.message + err.response.status + " Error");
  }); 
}

