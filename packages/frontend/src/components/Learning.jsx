import { useState, useContext } from 'react';
import { api } from "../api"
import { UserContext } from '../contexts/UserContext.jsx';
import { LearningForm } from '../components/LearningForm.jsx';
import { learningPlanParse } from '../utils/learningPlanParse.jsx';

export const Learning = () => {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState({});
    const { user, isLoggedIn } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await api.post('/api/chat',{ message: userMessage });
            const lesson = learningPlanParse(res.data)
            console.log(lesson);
            setResponse(lesson)            
        } catch (error) {
            console.error(error)
        }
    };

    const handleSave = async (event) => {
        console.log(response);
        event.preventDefault();
        if(!userMessage) return console.log("No message to save!")
        else {
            const body = {title: response.title, sections: response.sections, user: user._id}
            try {
                const res = await api.post('/api/lessons', body);
                console.log("Lesson saved!", res);
            } catch (error) {
                console.error(error)
            }
        }
    }    
    const makeList = (parsedStructure) => {
        const title = <h1 className={`text-xl font-bold`}>{parsedStructure.title}</h1>;
        const sections = parsedStructure.sections.map((section, index) => {
            const broadTopic = <h3 className={`text-md`}>{section.broadTopic}</h3>;
            const subtopics = section.subtopics.map((subtopic, subIndex) => <li className={`text-sm pl-1 list-disc`} key={subIndex}>{subtopic}</li>);
            return <div key={index}>{broadTopic}<ul className={`pl-10`}>{subtopics}</ul></div>;
        });
        return (<div className={`pl-8 flex flex-col`}>
            {title}<br/>
            <div className={`relative sm:absolute top-0 right-0 m-8 border border-gray-900 p-2 text-xs rounded w-1/3`}>This is a sample learning plan. If it all looks good, hit the save button~!</div>
            {sections}
            </div>)
    }

    return (
        <div>
            <h1>Learning</h1>
            {user ? 
                <LearningForm handleSubmit={handleSubmit} setUserMessage={setUserMessage}/>
            : <p>Please login to chat</p>
            } 
            <div className={`relative border border-gray-900 shadow-lg m-2 p-4 rounded flex flex-col items-center mx-auto w-full sm:w-3/4 lg:w-1/2`}>{Object.keys(response).length ? makeList(response): ""} <button className={`border border-gray-600 rounded mt-2 p-1`}onClick={handleSave}>Save Lesson Plan!</button></div>      
            
        </div>
    );
};

//LOR299746384 