import express from 'express'
const Router = express.Router()

import {getUsers, getUserById, createUser, updateUser, deleteUser} from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'


//CRUD
Router.get('/', isAuthenticated, getUsers)
Router.get('/:id', isAuthenticated, getUserById)
Router.post('/', isAuthenticated, createUser)
Router.put('/:id', isAuthenticated, updateUser)
Router.delete('/:id', isAuthenticated, deleteUser)



export default Router