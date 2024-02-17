import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { api } from "../api"
import { UserContext } from '../contexts/UserContext.jsx';
import { LearningForm } from '../components/LearningForm.jsx';
import { LearningCard } from '../components/LearningCard.jsx';
import { Link } from 'react-router-dom';

export const LearningHome = () => {
    const [lessons, setLessons] = useState([{}]);
    const { user, isLoggedIn } = useContext(UserContext);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                if (user && user._id) {
                    const res = await api.get(`/api/users/${user._id}/lessons`);
                    setLessons(res.data);
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchLessons();
    },[user])

    console.log('LESSONS', lessons);
    return (
        <div>
            <h1>Hi {user.username}, welcome to your learning Journeys</h1>
            <Link to="/learning/new">Create a new learning plan</Link>
            <h2 className={`text-green-500`}>Your learning plans: </h2>
            <div className="flex flex-col md:flex-row">
            {lessons.map((lessonPlan, index) => {
                return(
                    <Link to={`/playground/${lessonPlan._id}`}>
                        <LearningCard 
                            key={index}
                            id={lessonPlan._id} 
                            title={lessonPlan.title}  
                            lessons={lessonPlan.sections}/>
                    </Link>
                )
            })}
            </div>
        </div>
    );
};
