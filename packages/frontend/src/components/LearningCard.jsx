import { useState, useEffect} from 'react';
import { api } from "../api"


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
        try {
            const res = await api.put(`/api/lessons/${lesson._id}`, {
                title: editedTitle,
                lesson: editedLesson
            });
            console.log('res', res);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`border border-gray-900 shadow-lg flex flex-col justify-center items-center transition-all duration-300 m-2 p-4 rounded `}>
            <div onClick={handleEditClick}>{(isEditing) ? <button onClick={handleSave}>Save</button> : 'Edit'}</div>
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