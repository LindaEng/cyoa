import React, { useState } from 'react';
import { api } from '../../api/index.js'
import { ProgressRadialChart } from './ProgressRadialChart.jsx';

export const Modal = ({handleModalClose, title, sectionInfo, nodeData}) => {
    const [isMaximized, setIsMaximized] = useState(false);

    let score = nodeData.targetNode.score
    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div
            className={`absolute ${isMaximized ? 'w-11/12 h-auto' : 'w-1/2 h-auto'} bg-white border-2 border-black overflow-auto z-50 p-4 rounded`}
            style={isMaximized ? {top: '5%', left: '5%'} : {top: '25%', left: '25%'}}
        >
            <div className={`absolute top-0 left-0 w-full h-6 bg-orange-500 flex justify-end items-center p-1 border-b-2 border-black`}>
                <button className={`mr-1`}>_</button>
                <button className={`${isMaximized ? 'hidden' : ''} mr-1`} onClick={handleMaximize}>□</button>
                <button className={`mr-1`} onClick={handleModalClose}>X</button>
            </div>
            <h1 className={`text-2xl font-bold pt-8 pb-4`}>{title}</h1>
            <hr className={`border border-dotted border-black my-4`}/>
            <p>{sectionInfo}</p>
            <div className={`flex`}>
                <ProgressRadialChart progress={score} />
                <div className={`flex flex-col items-center justify-center p-4 ml-5 w-3/4`}>
                    <button className={`p-2 border border-black mb-5 bg-green-600 text-white w-full`}>Start Section</button>
                    <button className={`p-2 border border-black bg-blue-500 text-white w-full`}>Quiz Me</button>
                </div>
            </div>
        </div>
    )
}