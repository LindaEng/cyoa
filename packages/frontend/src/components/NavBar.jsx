import {useState, useEffect} from 'react'
import {navLinks} from '../constants/links.js'
import { api } from '../api/index.js'
import { useNavigate } from 'react-router-dom';


export const NavBar = () => {
    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const getMe = async () => {
            try {
                const res = await api.get('/api/users/me', { withCredentials: true });
                setUser(res.data);
                setIsLoggedIn(true)
            } catch (err) {
                console.log('no logged in user')
                setIsLoggedIn(false)
            }
        };

        getMe();
    }, [])

    const logOut = async () => {
        try {
            await api.post('/api/users/logout')
            setUser({})
            setIsLoggedIn(false)
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {navLinks.map((link, index) => {
                if(isLoggedIn && link.requiresLogin || link.name === "Home") {
                    return (
                        <a key={index} href={link.path}>{link.name}</a>
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