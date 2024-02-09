import { useState } from 'react';


export const LearningForm = ({handleSubmit, setUserMessage}) => {

    return (
        <>
        <div>
            <h1>Learning form</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="userMessage" placeholder="message" onChange={(e) => setUserMessage(e.target.value)}/>
                <button>Submit</button>
            </form>

        </div>
        </>
    )
}