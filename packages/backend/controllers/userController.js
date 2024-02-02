import express from 'express'

import User from '../models/userSchema'

//CRUD
const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users) 
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Sorry no users found"})
    }

}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)       
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User Not Found"})
    }
}

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "User Not Created"})
    }
}

// const updateUser = async (req: Request, res: Response) => {
//     try {
//         const user = await User.findById(req.params.id)
//     } catch (error) {
//         console.log(error);
//     }
// }

export {
    getUsers,
    getUserById,
    createUser
}