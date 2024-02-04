import { useState } from 'react'
import { api } from '../api/index.js'

export const Login = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
        console.log(login);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("THIS IS IT!",login);
        // await api.post('/login', login).then(res => {
        //     console.log(res);
        // }).catch(err => {
        //     console.log(err);
        // })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="username" onChange={handleChange}/>
                <input type="password"  name="password" placeholder="password" onChange={handleChange}/>
                <button>Login</button>
            </form>
        </div>
    )
}