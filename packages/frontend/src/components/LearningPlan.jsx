import React from 'react';
import { useState, useContext } from 'react';
import Markdown from 'react-markdown';
import { api } from "../api/index.js"
import { UserContext } from '../contexts/UserContext.jsx';
import { LearningForm } from './LearningForm.jsx';
import { learningPlanParse } from '../utils/learningPlanParse.jsx';
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import { set } from 'mongoose';

const markdown = `# Lesson Plan: Introduction to Paper

## Table of Contents
1. [Overview](#overview)
2. [History of Paper](#history-of-paper)
3. [Types of Paper](#types-of-paper)
4. [Paper Production Process](#paper-production-process)
5. [Environmental Impact of Paper](#environmental-impact-of-paper)
6. [Conclusion](#conclusion)

## Overview {#overview}
In this lesson, we will explore the fascinating world of paper. We will look at its history, different types, how it is produced, and its environmental impact. By the end of this lesson, you will have a comprehensive understanding of paper and its importance in our daily lives.

## History of Paper<a name="history-of-paper"></a>
In this section, we will delve into the history of paper. We will learn about its origins, the development of papermaking techniques, and the impact of paper on human civilization.

## Types of Paper<a name="types-of-paper"></a>
In this section, we will explore the various types of paper available today. We will learn about different paper grades, such as bond paper, newsprint, and cardstock. Additionally, we will discuss specialty papers, including parchment, rice paper, and handmade paper.

## Paper Production Process<a name="paper-production-process"></a>
In this section, we will examine the step-by-step process of paper production. We will explore each stage, from raw materials to the final product. Topics covered will include pulping, papermaking machines, and finishing processes.

## Environmental Impact of Paper<a name="environmental-impact-of-paper"></a>
In this section, we will discuss the environmental impact of paper production and consumption. We will analyze the deforestation and energy consumption associated with paper production, as well as recycling and sustainable forestry practices.

## Conclusion<a name="conclusion"></a>
In the final section, we will summarize the key points covered in this lesson. We will recap the history and types of paper, the paper production process, and the environmental impact of paper. Additionally, we will discuss the importance of responsible paper usage and sustainable alternatives.

Feel free to explore each subtopic in more detail, ensuring a well-rounded understanding of paper and its significance in our society.`
export const LearningPlan = () => {
    const [userMessage, setUserMessage] = useState('');
    const [response, setResponse] = useState(``);
    const [loading, setIsLoading] = useState(false);
    const { user, isLoggedIn } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/api/chat',{ message: userMessage });
            console.log(res.data);
            // const lesson = learningPlanParse(res.data)
            setResponse(res.data);
            setIsLoading(false);
            // setResponse(lesson)            
        } catch (error) {
            console.error(error)
        }
    };

    const handleSave = async (event) => {
        console.log(response);
        event.preventDefault();
        // if(!userMessage) return console.log("No message to save!")
        // else {
        //     const body = {title: response.title, sections: response.sections, user: user._id}
        //     try {
        //         const res = await api.post('/api/lessons', body);
        //         console.log("Lesson saved!", res);
        //     } catch (error) {
        //         console.error(error)
        //     }
        // }
    }    
    // const makeList = (parsedStructure) => {
    //     const title = <h1 className={`text-xl font-bold`}>{parsedStructure.title}</h1>;
    //     const sections = parsedStructure.sections.map((section, index) => {
    //         const broadTopic = <h3 className={`text-md`}>{section.broadTopic}</h3>;
    //         const subtopics = section.subtopics.map((subtopic, subIndex) => <li className={`text-sm pl-1 list-disc`} key={subIndex}>{subtopic}</li>);
    //         return <div key={index}>{broadTopic}<ul className={`pl-10`}>{subtopics}</ul></div>;
    //     });
    //     return (<div className={`pl-8 flex flex-col`}>
    //         {title}<br/>
    //         <div className={`relative sm:absolute top-0 right-0 m-8 border border-gray-900 p-2 text-xs rounded w-1/3`}>This is a sample learning plan. If it all looks good, hit the save button~!</div>
    //         {sections}
    //         </div>)
    // }

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
