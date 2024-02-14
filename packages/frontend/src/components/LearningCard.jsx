import React from 'react';
import { useState, useEffect} from 'react';
import { api } from "../api"
import { set } from 'mongoose';


export const LearningCard = ({ id, title, lesson }) => {
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
        setEditedTitle(e.target.value);
    };

    const handleLessonChange = (e) => {
        setEditedLesson(e.target.value);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        console.log('Reverting to:', title, lesson);
        setEditedTitle(title);
        setEditedLesson(lesson);
        setIsEditing(false);
    };
    

    const handleSave = async () => {
        console.log(id);
        try {
            const res = await api.put(`/api/lessons/${id}`, {
                title: editedTitle,
                lesson: editedLesson
            });
            console.log('res', res);
            setIsEditing(false);
            setEditedTitle(editedTitle);
            setEditedLesson(editedLesson);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`border border-gray-900 shadow-lg m-2 p-4 rounded `}>
            <div onClick={handleEditClick}>{(isEditing) ? <button onMouseDown={handleSave}>Save</button> : 'Edit'}</div>
            {(isEditing) && (
                <button onMouseDown={handleCancel}>Cancel</button>
            )}

            {isEditing ? (
                <input 
                    onBlur={handleBlur}
                    value={editedTitle} 
                    onChange={handleTitleChange}
                    className={`${isEditing ? 'ring-2 ring-blue-500' : ''} mb-2`}
                />
            ) : (
                <h2 
                    onBlur={handleBlur} 
                    onInput={handleTitleChange} 
                    contentEditable={isEditing}
                    suppressContentEditableWarning={true}
                    className={`${isEditing ? 'ring-2 ring-blue-500' : ''}`}
                >
                    {editedTitle}
                </h2>
            )}
            {isEditing ? 
                (
                    <textarea 
                        onBlur={handleBlur}
                        value={editedLesson} 
                        onChange={handleLessonChange}
                        className={`${isEditing ? 'ring-2 ring-blue-500' : ''} mb-2 w-full h-[10rem]`}
                    />)
            : (
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