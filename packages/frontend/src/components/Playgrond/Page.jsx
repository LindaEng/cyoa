import React, { useState } from 'react'
import { api } from '../../api/index.js'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkSlug from 'remark-slug'


export const Page = ({handleBackPage, currentSection}) => {   
    console.log(currentSection);
    return (
        <div className={`mt-8 p-4 overflow-auto`}>
            <Markdown
              className={`prose lg:prose-xl`}
              remarkPlugins={[remarkGfm, [remarkSlug, {slugify: s => s.toLowerCase()}]]} 
            >{currentSection}</Markdown>
            <button className={`mt-4 color-blue-400`} onClick={handleBackPage}>Back</button>           
        </div>
    )
}