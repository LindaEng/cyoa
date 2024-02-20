import React from 'react';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { api } from "../api/index.js"
import { UserContext } from '../contexts/UserContext.jsx';
import { LearningForm } from './LearningForm.jsx';
import { learningPlanParse } from '../utils/learningPlanParse.jsx';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { set } from 'mongoose';

const markdown = `# Topic: Backpacking       
## Table of Contents:

- [Introduction](#introduction)
- [Choosing the Right Backpack](#choosing-the-right-backpack)
- [Packing Essentials](#packing-essentials)
- [Planning and Preparing](#planning-and-preparing)
- [Navigation and Route Planning](#navigation-and-route-planning)
- [Safety and Emergencies](#safety-and-emergencies)
- [Leave No Trace Principles](#leave-no-trace-principles)
- [Conclusion](#conclusion)

## Introduction
In this lesson, we will explore the exciting world of backpacking. Backpacking is a form of outdoor recreation that involves carrying everything you need on your back and traveling through natural landscapes, typically for multiple days. This lesson will cover various aspects of backpacking, including choosing the right backpack, packing essentials, planning and preparing for a trip, navigation and route planning, safety and emergencies, and the importance of practicing Leave No Trace principles.

## Choosing the Right Backpack
In this section, we will learn about the different types and sizes of backpacks available for backpacking. We will discuss important factors to consider when choosing a backpack, such as capacity, fit, features, and materials.

## Packing Essentials
In this section, we will explore the essential items you should pack for a backpacking trip. We will cover the basics of clothing, shelter, sleeping gear, cooking equipment, food, water, and personal hygiene items. We will also discuss strategies for reducing pack weight and maximizing storage efficiency.

## Planning and Preparing
In this section, we will delve into the importance of planning and preparing for a backpacking trip. We will cover topics such as selecting a destination, researching the area, obtaining necessary permits, creating a trip itinerary, and gathering information about the local weather, wildlife, and regulations.

## Navigation and Route Planning
In this section, we will learn about the importance of navigation skills and route planning in backpacking. We will discuss various tools and techniques for map reading, using a compass, and navigating with GPS devices. We will also explore how to plan a route, consider factors like distance, elevation gain, and terrain difficulty, and assess potential hazards and landmarks along the way.

## Safety and Emergencies
In this section, we will focus on safety practices and preparation for emergencies while backpacking. We will cover important topics such as first aid, wildlife encounters, weather-related hazards, and emergency communication devices. We will also discuss strategies for minimizing risks and staying safe in wilderness settings.

## Leave No Trace Principles
In this section, we will emphasize the importance of environmental stewardship and practicing Leave No Trace principles while backpacking. We will discuss the seven core principles, including minimizing campfire impacts, packing out trash, respecting wildlife, and leaving natural and cultural artifacts untouched. We will also explore strategies for minimizing our impact on the environment while enjoying outdoor activities.

## Conclusion
In this concluding section, we will summarize the key points covered in this lesson. We will emphasize the importance of responsible backpacking practices, which include being well-prepared, respecting nature, and ensuring our safety and the safety of others. Backpacking can be a rewarding and enriching experience, providing opportunities for adventure, self-sufficiency, and connecting with the natural world.`

export const LearningPlan = () => {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState(``);
    const [loading, setIsLoading] = useState(false);
    const { user, isLoggedIn } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/api/chat',{ message: userMessage });
            console.log(res.data);
            setResponse(res.data);
            setIsLoading(false);
            // setResponse(lesson)            
        } catch (error) {
            console.error(error)
        }
    };

    const handleSave = async (event) => {
        const saveLesson = learningPlanParse(response)
        event.preventDefault();
        // if(!userMessage) return console.log("No message to save!")
        // else {
            const body = {title: saveLesson.title, sections: saveLesson.sections, lessonPlan:response, user: user._id}
            try {
                const res = await api.post('/api/lessons', body);
                navigate(`/learning`)
            } catch (error) {
                console.error(error)
            }
        // }
    }    


    return (
        <div>
            <h1>Learning</h1>
            {user ? 
                <LearningForm handleSubmit={handleSubmit} setUserMessage={setUserMessage}/>
            : <p>Please login to chat</p>
            }
            {loading ? (
                <div>Loading...</div>
            ) : (
                response && (
                    <div className={`relative border border-gray-900 shadow-lg m-2 p-4 rounded`}>
                        {Object.keys(response).length ? <Markdown 
                        className={`prose lg:prose-xl`}
                        remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]} 
                        >{response}</Markdown> : ""} 
                    
                        <button className={`border border-gray-600 rounded mt-2 p-1`}onClick={handleSave}>Save Lesson Plan!</button>
                    </div>  
                )
            )}
        </div>
    );
};

//LOR299746384 
