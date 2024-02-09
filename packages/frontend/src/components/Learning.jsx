import { useState, useContext } from 'react';
import { api } from "../api"
import { UserContext } from '../contexts/UserContext.jsx';
import { LearningForm } from '../components/LearningForm.jsx';

export const Learning = () => {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState('');
    const { user, isLoggedIn } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await api.post('/api/chat',{ message: userMessage });
        setResponse(res.data);
    };

    return (
        <div>
            <h1>Learning</h1>
            {user ? 
                <LearningForm handleSubmit={handleSubmit} setUserMessage={setUserMessage}/>
            : <p>Please login to chat</p>
            } 
            <p>{response}</p>      
        </div>
    );
};

//LOR299746384 