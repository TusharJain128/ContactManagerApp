import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'
import "./login.css"

export default function RegisterPage(){

    const navigate = useNavigate()

    let [firstName, setFirstName] = useState("")
    let [lastName, setLastName] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [mobile, setMobile] = useState("")

    const register = function (event){
        event.preventDefault()
        axios.post("http://localhost:3001/api/user/createUser",
        {firstName,lastName,email,password,mobile})
        .then((res)=>{
            alert('You have successfully registered')
            navigate('/login')
        })
        .catch((err)=>{
            alert(err.response.data.message + " Error")
        })
    }
    return(
        <form onSubmit={register} className = 'login' align= "center">
            <h1>Contact Manager</h1><br/><br/>
            <input type = 'text' placeholder="First Name" onChange={(e)=> setFirstName(e.target.value)} required/><br/>
            <input type= 'text' placeholder="Last Name" onChange={(e)=> setLastName(e.target.value)} required/><br/>
            <input type='email' placeholder="Email id" onChange={(e)=> setEmail(e.target.value)} required/><br/>
            <input type='password' placeholder="Password" onChange={(e)=> setPassword(e.target.value)} required/><br/>
            <input type='mobile' placeholder="Mobile Number" onChange={(e)=> setMobile(e.target.value)} required/><br/>
            <button type="submit" className="button" >Register</button>
            <div>or</div>
            <button className="button" onClick={()=>navigate("/login")}>Login</button>
        </form>
    )
}