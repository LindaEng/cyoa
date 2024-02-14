import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext.jsx'

export const HomePage = () => {
   const { user } = useContext(UserContext)

    return (
        <div>
            <h1>hello</h1>
            {/* <button onClick={getUser}>Get User</button> */}
            <p>{(user) ? user.username : "hello!"}</p>
        </div>
    )
}