import React from 'react';
import { useState } from 'react';


export const LearningCard = ({ id, title, lesson }) => {

    return (
        <div className={`border border-gray-900 shadow-lg m-2 p-4 rounded `}>
           {title}
        </div>
    );
};