import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../auth/login.css'

export default function CreateContact(){

    let [name, setName] = useState('')
    let [number, setNumber] = useState('')

    let [email, setEmail] = useState('')
    let [address, setAddress] = useState('')
    let [birthday, setBirthday] = useState('')
    let [website, setWebsite] = useState('')

    const navigate= useNavigate()
    let token = localStorage.getItem("x-api-key")

    function create(event){
        event.preventDefault()
        let data = {name, number}
        if(email) data.email = email
        if(address) data.address = address
        if(birthday) data.birthday = birthday
        if(website) data.website = website
        axios.post('http://localhost:3001/api/contact/createContact',
                    data,
                    {headers:{'x-api-key': token}})
        .then((res)=>{
            alert('Your contact is successfully created')
            navigate('/')
        })
        .catch((err)=>{
            alert(err.response.data.message + " Error")
        })
    }
    return(<>
            <button className="backButton" onClick={()=>navigate('/')}>Back</button>
        <form onSubmit={create} className="login">
            <h1>Create Contact</h1>
            <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)} required/>
            <input type="number" placeholder="Number" onChange={(e)=> setNumber(e.target.value)} required/>
            <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
            <input type="date" placeholder="Birthday" onChange={(e)=> setBirthday(e.target.value)}/>
            <input type="text" placeholder="Address" onChange={(e)=> setAddress(e.target.value)}/>
            <input type="text" placeholder="Website" onChange={(e)=> setWebsite(e.target.value)}/>
            <button type="submit" className="button">Submit</button>
        </form>
        </>
    )
}