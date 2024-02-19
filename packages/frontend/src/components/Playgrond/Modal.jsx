import React, { useState } from 'react';
import { api } from '../../api/index.js'

export const Modal = ({handleModalClose, title, sectionInfo}) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [difficulty, setDifficulty] = useState('');
    const [sections, setSections] = useState([{}]);

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    return (
        <div
            className={`absolute ${isMaximized ? 'w-11/12 h-full' : 'w-1/2 h-1/2'} bg-white border-2 border-black overflow-auto z-50 p-4 rounded`}
            style={isMaximized ? {top: '5%', left: '5%'} : {top: '25%', left: '25%'}}
        >
            <div className={`absolute top-0 left-0 w-full h-6 bg-orange-500 flex justify-end items-center p-1 border-b-2 border-black`}>
                <button className={`mr-1`}>_</button>
                <button className={`${isMaximized ? 'hidden' : ''} mr-1`} onClick={handleMaximize}>□</button>
                <button className={`mr-1`} onClick={handleModalClose}>X</button>
            </div>
            <h1 className={`text-2xl font-bold pt-8 pb-4`}>{title}</h1>
            <p>{sectionInfo}</p>
        </div>
    )
}