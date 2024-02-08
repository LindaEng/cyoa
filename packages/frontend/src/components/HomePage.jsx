import { useState, useEffect } from 'react'
import { api } from '../api/index.js'
import axios from 'axios'
import { set } from 'mongoose'

export const HomePage = () => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/api/users/me', { withCredentials: true });
                setUser(res.data);
                setIsLoggedIn(true)
            } catch (err) {
                console.log('no logged in user')
                setIsLoggedIn(false)
                // set some state here to indicate that an error occurred
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h1>hello</h1>
            {/* <button onClick={getUser}>Get User</button> */}
            <p>{user.username}</p>
        </div>
    )
}