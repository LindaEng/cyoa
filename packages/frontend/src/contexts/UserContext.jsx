// UserContext.js
import React, { useState, useEffect, createContext } from 'react';
import { api } from '../api/index.js';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await api.get('/api/users/me', { withCredentials: true });
                if(res.data.username) {
                    setUser(res.data);
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };

        getMe();
    }, []);

    return (
        <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};