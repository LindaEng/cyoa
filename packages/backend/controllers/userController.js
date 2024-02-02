import express from 'express'

import User from '../models/userSchema.js'

//CRUD
const getUsers = async (req, res) => {
    console.log("getting users ", req.isAuthenticated());
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

const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const result = await User.updateOne({ _id: req.params.id }, data);

        if (result.nModified == 0) {
            res.status(404).json({ message: "User Not Found or No Changes Made" });
        } else {
            res.status(200).json({ message: "User updated successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating user" });
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json({ message: "User deleted successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting user" });
    }
}

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}