import React, { useState, useEffect } from "react";
import  "../../contacts.css"
import getContacts from "../../scripts/dashboard";
import { Link, Redirect } from "react-router-dom";
import deleteContact from "../../scripts/deleteContact";

export default function GetContacts() {
  const [data, setData] = useState([]);

  function logout(){
    localStorage.clear('x-api-key')
    alert("You have successfully logged out")
    return <Redirect to="/" />
}
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
    <>
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        My Contacts
      </Link>
      <div className="navbar__links">
        <Link to="/CreateContact" className="navbar__link">
          New Contact
        </Link>
        
        <button onClick={logout} className="navbar__logout">
          Logout
        </button>
      </div>
    </nav>
    <div className="contacts">
      {data.map((contact, index) => (
        <div key={index} className="contact">
          <img src={contact.profileImage} alt={contact.name} className="avatar" />
          <div className="details">
            <p className="name">{contact.name}</p>
            <p className="mobile">{contact.number}</p>
            <div className="buttons">
              <button>Edit</button>
              <button onClick={()=> deleteContact(contact._id)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}
