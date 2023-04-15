import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import '../auth/login.css'

export default function EditContact(){

    const {contactId} = useParams()
    let [name, setName] = useState('')
    let [number, setNumber] = useState('')
    let [email, setEmail] = useState('')
    let [address, setAddress] = useState('')
    let [birthday, setBirthday] = useState('')
    let [website, setWebsite] = useState('')
    let token = localStorage.getItem('x-api-key')
    let navigate = useNavigate()

    function edit(event){
        event.preventDefault(); // prevents the default form submission behavior
        let data = {name, number}
        if(email) data.email = email
        if(address) data.address = address
        if(birthday) data.birthday = birthday
        if(website) data.website = website
        axios.put(`http://localhost:3001/api/contact/editContact/${contactId}`,
                    data,
                    {headers:{'x-api-key':token}})
        .then((res)=>{
            alert('Your contact details is successfully updated')
            navigate(`/getContact/${contactId}`)
        })
        .catch((err)=>{
            alert(err.response.data.message + " Error")
        })
    }
    
    useEffect(()=>{
        axios.get(`http://localhost:3001/api/contact/getContact/${contactId}`,
                    {headers:{'x-api-key': token}})
        .then((res)=>{
            setName(res.data.message.name)
            setNumber(res.data.message.number)
            setEmail(res.data.message.email)
            setAddress(res.data.message.address)
            setBirthday(res.data.message.birthday)
            setWebsite(res.data.message.website)
        })
        .catch((err)=>{
            alert(err.response.data.message + " Error")
            navigate('/')
        })
    }, [])
    return(
        <>
        <button className="backButton" onClick={()=>navigate('/')}>Back</button>
        <form className="login" onSubmit={edit}> 
            <h1>Edit Contact</h1>
            <label><strong>Name:</strong></label>
            <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required/><br/>
            <label><strong>Number:</strong></label>
            <input type="number" placeholder='Number' value={number} onChange={(e)=>setNumber(e.target.value)} required/><br/>
            <label><strong>Email:</strong></label>
            <input type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br/>
            <label><strong>Birthday:</strong></label>
            <input type="date" placeholder='Birthday' value={birthday} onChange={(e)=>setBirthday(e.target.value)}/><br/>
            <label><strong>Address:</strong></label>
            <input type="text" placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/><br/>
            <label><strong>Website:</strong></label>
            <input type="text" placeholder='Website' value={website} onChange={(e)=>setWebsite(e.target.value)}/><br/>
            <button type="submit" className='button'>Submit</button>
        </form>
        </>
    )
}