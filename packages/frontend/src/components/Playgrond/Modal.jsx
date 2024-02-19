import React from 'react';
import { useState } from 'react';

export const Modal = ({handleModalClose, title, sectionInfo}) => {
    return (
        <div
            className={`absolute top-0 left-0 w-1/2 h-1/2 bg-white border-2 border-black p-4 overflow-auto z-50`}
            style={{top: '25%', left: '25%'}}
        >
            <h1>{title}</h1>
            <button onClick={handleModalClose}>Close</button>
        </div>
    )
}