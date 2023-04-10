import React, { useState, useEffect } from "react";
import  "../../contacts.css"
import getContacts from "../../scripts/dashboard";

export default function GetContacts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getContacts()
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message + err.response.status + " Error");
      });
  }, []);

  return (
    <div className="contacts">
      {data.map((contact, index) => (
        <div key={index} className="contact">
          <img src={contact.profileImage} alt={contact.name} className="avatar" />
          <div className="details">
            <p className="name">{contact.name}</p>
            <p className="mobile">{contact.number}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
