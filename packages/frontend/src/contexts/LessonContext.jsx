import React, { useState, useEffect, createContext } from 'react';
import { api } from '../api/index.js';

export const LessonContext = createContext();

export const LessonProvider = ({ children }) => {
    const [lessons, setLessons] = useState([{}]);
    const 
}