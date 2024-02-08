import { useState } from 'react'
import { api } from '../api/index.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
        console.log(login);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("THIS IS IT!",login);
        await api.post('/api/users/login', login, { withCredentials: true }).then(res => {
            console.log(res, "Login successful!");
            navigate('/')
        }).catch(err => {
            console.log(err);
        })
    }

    const handleOnClick = (e) => {
        console.log("Google login", import.meta.env.VITE_APP_TEST);
        e.preventDefault()
        window.location.href = import.meta.env.VITE_APP_BASE_URL + '/auth/google'
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" onChange={handleChange}/>
                <input type="password"  name="password" placeholder="password" onChange={handleChange}/>
                <button>Login</button>
            </form>
            <button onClick={handleOnClick}>Log with Google</button>
        </div>
    )
}