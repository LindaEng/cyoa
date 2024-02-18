import React from 'react'
import { useState, useContext } from 'react'
import { api } from '../api/index.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext.jsx'


export const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const { setUser, setIsLoggedIn } = useContext(UserContext)

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
            setUser(res.data);
            setIsLoggedIn(true);
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
            <div class="flex items-center justify-center h-screen dark:bg-gray-800">
                <button className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150" onClick={handleOnClick}>
                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
                    <span>Login with Google</span>
                </button>
            </div>
            
        </div>
    )
}