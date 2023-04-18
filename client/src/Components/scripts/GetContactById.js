import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import './getContact.css'
import '../auth/login.css'
import Navbar from "../navbar/GetContactIdNavbar"
import DeleteConfirmationPopup from "./DeleteConfirmationPopup"

export default function GetContactById(){
    let navigate = useNavigate()
    const [data, setData] = useState(Object)
    const [deleteContactId, setDeleteContactId] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const {contactId} = useParams()
    const token = localStorage.getItem('x-api-key')

    useEffect(()=>{
    axios.get(`http://localhost:3001/api/contact/getContact/${contactId}`,
                            {headers:{'x-api-key': token}})
    .then((res)=>{
        setData(res.data.message)
    })
    .catch((err)=>{
        alert(err.response.data.message + err.response.status + " Error");
    })
  },[])
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

    return(
        <>
        <>{Navbar()}</>
        <div className="contact-card">
            <h2 align="center">Contact Details</h2>
            <p className="contact-field"><strong>Name:</strong> {data.name}</p>
            <p className="contact-field"><strong>Number:</strong> {data.number}</p>
            <p className="contact-field"><strong>Email:</strong> {data.email}</p>
            <p className="contact-field"><strong>Birthday:</strong> {data.birthday}</p>
            <p className="contact-field"><strong>Address:</strong> {data.address}</p>
            <p className="contact-field"><strong>Website:</strong> {data.website}</p>
        </div>
        <div className="button-container">
            <button className="button" type="button" onClick={()=>navigate(`/editContact/${contactId}`)}>Edit</button>
            <button className="button" type="button" onClick={() => handleDeleteClick(contactId)}>Delete</button>
        </div>
        <DeleteConfirmationPopup
            isOpen={isPopupOpen}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
        />
        </>
  );
}