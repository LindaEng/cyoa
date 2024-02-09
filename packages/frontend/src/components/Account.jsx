import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext.jsx';
import { set } from 'mongoose';
import { api } from '../api/index.js';

export const Account = () => {
    const { user, setUser, setIsLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteAccount = async () => {
        try {
            await api.delete(`/api/users/${user._id}`, { withCredentials: true });
            setUser({})
            setIsLoggedIn(false);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Account</h1>
            <p>{user.username}</p>
            <button onClick={deleteAccount}>Delete Account</button>
        </div>
    )
}