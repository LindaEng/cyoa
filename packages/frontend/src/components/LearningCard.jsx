import { useState, useEffect } from 'react';

export const LearningCard = ({ title, lesson }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedLesson, setEditedLesson] = useState(lesson);
   
    useEffect(() => {
        setEditedTitle(title);
        setEditedLesson(lesson);
    }, [title, lesson]);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.innerText);
    };

    const handleLessonChange = (e) => {
        setEditedLesson(e.target.innerText);
    };

    return (
        <div className={`border border-gray-900 shadow-lg flex flex-col justify-center items-center transition-all duration-300 m-2 p-4 rounded `}>
            <button onClick={handleEditClick}>{(isEditing) ? 'Save' : 'Edit'}</button>
            {(isEditing) && (
                <button onClick={handleBlur}>Cancel</button>
            )}

            {editedTitle && (
                <h2 
                    onBlur={handleBlur} 
                    onInput={handleTitleChange} 
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`${isEditing ? 'ring-2 ring-blue-500' : ''} mb-2`}
                >
                    {editedTitle}
                </h2>
            )}
            {editedLesson && (
                <p 
                    onBlur={handleBlur} 
                    onInput={handleLessonChange} 
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
                >
                    {editedLesson}
                </p>
            )}
        </div>
    );
};