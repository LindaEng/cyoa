import React from 'react'
import { useState, useEffect } from 'react'
import {navLinks} from '../constants/links.js'
import { api } from '../api/index.js'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';

export const NavBar = () => {
    const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(UserContext)
    const navigate = useNavigate();


    const logOut = async () => {
        try {
            await api.post('/api/users/logout');
            setUser({}); // Clear the user data
            setIsLoggedIn(false); // Set isLoggedIn to false
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {navLinks.map((link, index) => {
                if(isLoggedIn && link.requiresLogin || link.name === "Home") {
                    return (
                        <a className={`m-3`} key={index} href={link.path}>{link.name}</a>
                    )
                }
                if(!isLoggedIn && !link.requiresLogin) {
                    return (
                        <a key={index} href={link.path}>{link.name}</a>
                    )
                }
            })}
            {(isLoggedIn) ? 
            <button onClick={logOut}>
                Logout
            </button> 
            : ""}
        </div>
    )
}