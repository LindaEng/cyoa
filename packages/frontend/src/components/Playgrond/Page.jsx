import React, { useEffect, useState } from 'react'
import { api } from '../../api/index.js'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'


export const Page = ({handleBackPage, currentSection, currentPage, handleScore, nodeData}) => {   
    const [checkedItems, setCheckedItems] = useState({});
    let paragraphCounter = 0

    const handleSave = async () => {
        try {
            await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}/pages/${currentPage}`, {
                completed: paragraphCounter === checkedItems, 
                score: Math.round((checkedItems / paragraphCounter) * 100)
            })
        } catch (error) {
            console.error(error);
        }
    }

    const handleCheckboxChange = (event) => {
        const paragraphId = event.target.name;
        const isChecked = event.target.checked;
        setCheckedItems(prevCheckedItems => ({
            ...prevCheckedItems,
            [paragraphId]: isChecked,
        }));
        console.log(checkedItems);
    };
    
    return (
        <div className={`mt-8 p-8 overflow-auto`}>
            <Markdown
              className={`prose lg:prose-xl`}
              remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]}
              components={{
                p: ({node, ...props}) => {
                    paragraphCounter++;
                    const paragraphId = node.position.start.offset
                    return (
                        <div>
                            <p {...props} />
                            <input className={`mr-2`} type="checkbox" name={paragraphId} checked={checkedItems[paragraphId] || false} onChange={handleCheckboxChange} /><span><b>Check for Completion</b></span>
                            {paragraphCounter === 1 && <hr style={{borderTop: "1px dotted"}} />}
                        </div>
                    );
                },
            }} 
            >{currentSection}</Markdown>
            <button className={`mt-4 pl-4 pr-4 bg-blue-400 text-white rounded`} onClick={()=> {
                handleBackPage()
                handleScore()
                }}>Back</button>           
        </div>
    )
}