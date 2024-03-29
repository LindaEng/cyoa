import React, { useState, useEffect } from 'react';
import { api } from '../../api/index.js'
import { ProgressRadialChart } from './ProgressRadialChart.jsx';
import { LessonContext } from '../../contexts/LessonContext.jsx';
import { Page } from './Page.jsx';
import Draggable from 'react-draggable';

export const Modal = ({handleModalClose, title, sectionInfo, nodeData, lesson}) => {    
    const [isMaximized, setIsMaximized] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentSection, setCurrentSection] = useState(``);
    const [currentNode, setCurrentNode] = useState(nodeData.targetNode);
    const [isUpdating, setIsUpdating] = useState(false);
    const [started, setStarted] = useState(nodeData.targetNode.started);
    const [score, setScore] = useState(nodeData.targetNode.score);

    const fetchPage = async () => {
        let lessonId = nodeData.lessonId
        let sectionName = nodeData.section
        let page = currentPage
        try {
            const res = await api.get(`/api/lessons/${lessonId}/sections/${sectionName}/pages/${page}`)
            const pageData = res.data.content
            console.log("FETCH PAGE DATA", res.data);
            setCurrentSection(pageData)
            setCurrentNode(res.data)
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchPage()
    }, [currentPage]);


    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleBackPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleNextPage = async () => {
        setCurrentPage(currentPage + 1);
    }

    const handleStartSection = async () => { 
        try {
            console.log("Starting Section");
            setIsUpdating(true);
            const updateContentRes = await api.post(`/api/chat/section`, { sectionInfo: sectionInfo, section: title})

            const res = await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}`, {started: true, pages: [{page: 1, completed: false, score: 0, content: updateContentRes.data}]}); 
            console.log(res);

            setCurrentPage(1);
            setCurrentSection(updateContentRes.data);
            setIsUpdating(false);
            setStarted(true);
        } catch (error) {
            console.error(error);
        }
    }

    const handleScore = (score) => {
        setScore(score);
    }

    return (
        <Draggable>
        <div
            className={`absolute ${isMaximized ? 'w-11/12 h-full' : 'w-1/2 h-3/5'} bg-white border-2 border-black overflow-auto z-50 rounded`}
            style={isMaximized ? {top: '5%', left: '5%'} : {top: '25%', left: '25%'}}
        >
            <div className={`sticky top-0 left-0 w-full h-6 bg-orange-500 flex justify-end items-center p-1 border-b-2 border-black`}>
                <button className={`mr-1`}>_</button>
                <button className={`mr-1`} onClick={handleMaximize}>{(isMaximized) ? '><' : '□'}</button>
                <button className={`mr-1`} onClick={() => {
                    handleModalClose()
                    setCurrentPage(0)
                }}>X</button>
            </div>
            {currentPage === 0 ? (<>
            <div className={`pl-6 pr-6`}>
                <h1 className={`text-2xl font-bold pt-8 pb-4`}>{title}</h1>
                <hr className={`border border-dotted border-black my-4`}/>
                <p>{sectionInfo}</p>
                <div className={`flex`}>
                    <ProgressRadialChart progress={score} />
                    <div className={`flex flex-col items-center justify-center p-4 ml-5 w-3/4`}>
                        {started ? <button className={`p-2 mb-5 bg-green-700 text-white w-full`} onClick={() => {
                            handleNextPage()
                        }    
                        }>Continue</button> : <button className={`p-2 mb-5 bg-green-700 text-white w-full`} onClick={handleStartSection}>{isUpdating ? `Loading Content...` : `Start Section`}</button>}                   
                        
                    </div>
                </div>
            </div>
            </>) : 
            (<Page
                handleBackPage={handleBackPage}
                currentSection={currentSection}
                handleScore={handleScore}
                nodeData={nodeData}
                currentPage={currentPage}
                checkedItemsMap={currentNode.checkedItems ? currentNode.checkedItems : {}}
            
            />)}
        </div>
        </Draggable>        
    )
}