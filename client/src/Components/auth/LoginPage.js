import React ,{useState}from "react";
import "./login.css"
import axios from "axios";
import {useNavigate} from"react-router-dom"


export default function LoginPage (){
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = function (event) {
        event.preventDefault();
        axios.post('http://localhost:3001/api/user/loginUser', {
           email,password
        })
            .then((res) => {
                alert(`Your Acount Login Succesfully`)
                const token = res.data.token;
                localStorage.setItem("x-api-key", token)
                navigate('/')
            }).catch((err) => {
                alert(err.response.data.message + err.response.status + " Error")
            })
    }


    return(
        <form onSubmit={login} className="login">
           
            <h1>Login</h1>
            <input type='email' placeholder="Email id" onChange={((e) => setEmail(e.target.value))} required/>
            <input type='password' placeholder="Password" onChange={((e) => setPassword(e.target.value))} required/>
            <button type="submit" className="button" >Login</button>
            <div>or</div>
            <button className="button" onClick={()=>navigate("/register")}>Register</button>

        </form>
    )
}