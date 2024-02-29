import React, { useEffect, useState } from 'react'
import { api } from '../../api/index.js'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'
import { updateEdge } from 'reactflow'


export const Page = ({handleBackPage, pageId, currentSection, currentPage, handleScore, nodeData, checkedItemsMap}) => {   
    const [saved, setSaved] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    let paragraphCounter = 0;
    let paragraphIdMap = {}

    useEffect(() => {
 console.log("PAGE CHECKEDITEMS MAP",checkedItemsMap)

        const addChecks = () => {
            (checkedItemsMap != undefined) ? setCheckedItems(checkedItemsMap) : setCheckedItems(paragraphIdMap);
        }
        addChecks();
    }, [checkedItemsMap]);

    const handleSave = async () => {
        try {
            const score = calculateScore(checkedItems);
            const res = await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}/pages/${currentPage}`, {
                completed: score === 100 ? true : false, 
                score: score,
                checkedItems: checkedItems
            })
            const updateScore = await api.put(`/api/lessons/${nodeData.lessonId}/sections/${nodeData.section}`, {score: score});
        } catch (error) {
            console.error(error);
        }
    }

    const handleQuiz = async () => {
        try {
            const pageInfo = currentSection
            const res = await api.post(`/api/chat/quiz`, { pageInfo: pageInfo })
            console.log(res);
        } catch (error) {
            console.error(error)
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
        <div className={`mt-8 p-8`}>
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
            <button className={`mr-4 pl-4 pr-4 bg-blue-600 text-white rounded`} onClick={()=> {
                handleBackPage()
                handleScore(calculateScore(checkedItems))
                }}>Back</button>   
            <button className={`m-4 pl-4 pr-4 bg-green-600 text-white rounded`} onClick={()=> {
                handleSave()
                 }}>Save</button>  
            <button className={`mr-4 p-2 bg-blue-500 text-white w-full`} onClick={handleQuiz}>Quiz Me</button>      
        </div>
    )
}