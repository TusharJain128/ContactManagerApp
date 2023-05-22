import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./contacts.css";
import Navbar from "../navbar/Nav";
import DeleteConfirmationPopup from "../scripts/DeleteConfirmationPopup";

export default function GetContacts() {
  const [data, setData] = useState([]);
  const [deleteContactId, setDeleteContactId] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("x-api-key");
    axios
      .get(`http://localhost:3001/api/contact/getContacts${searchTerm ? `?name=${searchTerm}` : ""}`, {
        headers: { "x-api-key": token },
      })
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message + err.response.status + " Error");
        navigate("/login");
      });
  }, [searchTerm]);

  const handleDeleteClick = (contactId) => {
    setDeleteContactId(contactId);
    setIsPopupOpen(true);
  };

  const handleConfirmDelete = () => {
    navigate(`/deleteContact/${deleteContactId}`)
    setIsPopupOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteContactId("");
    setIsPopupOpen(false);
  };

  let handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <>
      <Navbar handleSearch={handleSearch} searchTerm={searchTerm} searchBar={true} />
      <div className="contacts">
        {data.map((contact) => (
          <div key={Math.random()} className="contact">
            <img
              src={contact.profileImage}
              alt={contact.name}
              className="avatar"
            />
            <div className="details">
              <button
                className="name"
                onClick={() => navigate(`/getContact/${contact._id}`)}
              >
                {contact.name}
              </button>
              <p className="mobile">{contact.number}</p>
              <div>
                <button
                  className="buttonMain"
                  onClick={() => navigate(`/editContact/${contact._id}`)}
                >
                  Edit
                </button>
                <button
                  className="buttonsMain"
                  onClick={() => handleDeleteClick(contact._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DeleteConfirmationPopup
        isOpen={isPopupOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
