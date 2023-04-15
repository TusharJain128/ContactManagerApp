import React from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteContact(){
    const {contactId} = useParams()
    let navigate = useNavigate()
    let token = localStorage.getItem('x-api-key')

    axios.delete(`http://localhost:3001/api/contact/deleteContact/${contactId}`, {headers:{'x-api-key': token}})
    .then((res)=>{
        navigate('/')
    })
    .catch((err)=>{
        alert(err.response.data.message + " Error")
    })
}