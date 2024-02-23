import React, { useEffect, useState } from 'react'
import { api } from '../../api/index.js'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import { updateEdge } from 'reactflow'
import { set } from 'mongoose'


export const Page = ({handleBackPage, pageId, checkedItems, setCheckedItems, currentSection, currentPage, handleScore, nodeData, checkedItemsMap}) => {   
    const [saved, setSaved] = useState(false);
    let paragraphCounter = 0;
    let paragraphIdMap = {}

    console.log();


    useEffect(() => {
        const addChecks = () => {
            (checkedItemsMap != undefined) ? setCheckedItems(checkedItemsMap) : setCheckedItems(paragraphIdMap);
        }
        addChecks();
    }, []);



    const handleSave = async () => {
        try {
            const score = calculateScore(checkedItems);
            const res = await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}/pages/${currentPage}`, {
                completed: score === 100 ? true : false, 
                score: score,
                checkedItems: checkedItems
            })
            console.log("Page-Handlesave ",res);
            const updateScore = await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}`, {score: score});
            console.log("Updated Score!", updateScore);
        } catch (error) {
            console.error(error);
        }
    }

    const calculateScore = (items) => {
        let score = 0;
        for (const item in checkedItems) {
            if (checkedItems[item] === true) score++;
        }
        score = Math.round((score / paragraphCounter) * 100);
        return score;
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
        <div className={`mt-8 p-8 h-auto w-full overflow-auto `}>
            <Markdown
              className={`prose lg:prose-xl `}
              remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]}
              components={{
                p: ({node, ...props}) => {
                    paragraphCounter++;
                    const paragraphId = node.position.start.offset
                    paragraphIdMap[paragraphId] = false
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
            <button className={`mt-4 pl-4 pr-4 bg-blue-600 text-white rounded`} onClick={()=> {
                handleBackPage()
                handleScore(calculateScore(checkedItems))
                }}>Back</button>   
            <button className={`mt-4 pl-4 pr-4 bg-green-600 text-white rounded`} onClick={()=> {
                handleSave()
                 }}>Save</button>        
        </div>
    )
}