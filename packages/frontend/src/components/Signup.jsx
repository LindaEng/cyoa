import React from 'react'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext.jsx'
import { api } from '../api/index.js'

export const Signup = () => {
    const [signup, setSignup] = useState({})
    const { user, setUser, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignup({...signup, [e.target.name]: e.target.value})
        console.log(signup);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(signup.password === signup.password2) {
            await api.post('/api/users/signup', signup, { withCredentials: true }).then(res => {
                console.log(res, "Signup successful!");
                setUser(res.data);
                setIsLoggedIn(true);
                navigate('/')
            }).catch(err => {
                console.log(err);
        })} else {
            console.log("Passwords do not match");
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="email" onChange={handleChange}/>
                <input type="text" name="username" placeholder="username" onChange={handleChange}/>
                <input type="password"  name="password" placeholder="password" onChange={handleChange}/>
                <input type="password"  name="password2" placeholder="confirm password" onChange={handleChange}/>
                <button>Signup</button>
            </form>
        </div>
    )
}