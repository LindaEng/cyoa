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
        try {
            const res = await api.post('/api/chat',{ message: userMessage });
            setResponse(res.data);            
        } catch (error) {
            console.error(error)
        }
    };

    const handleSave = async (event) => {
        console.log("RESPONSE ", response);
        event.preventDefault();
        if(!userMessage) return console.log("No message to save!")
        else {
            const body = {title: userMessage, lesson: response, user: user._id}
            try {
                const res = await api.post('/api/lessons', body);
                console.log("Lesson saved!", res);
            } catch (error) {
                console.error(error)
            }
        }
    }    

    return (
        <div>
            <h1>Learning</h1>
            {user ? 
                <LearningForm handleSubmit={handleSubmit} setUserMessage={setUserMessage}/>
            : <p>Please login to chat</p>
            } 
            <p>{response}</p>      
            <button onClick={handleSave}>Save Lesson Plan!</button>
        </div>
    );
};

//LOR299746384 