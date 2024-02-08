import { useState, useEffect } from 'react'
import { api } from '../api/index.js'

const Account = () => {
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/api/users/me', { withCredentials: true });
                setUser(res.data);
            } catch (err) {
                console.log('no logged in user')
            }
        };

        fetchUser();
    })
}