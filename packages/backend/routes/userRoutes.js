import express from 'express'
const Router = express.Router()

import {getUsers, getMe, getUserById, createUser, updateUser, deleteUser, login} from '../controllers/userController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'


//CRUD
Router.get('/', isAuthenticated, getUsers)
Router.get('/me', isAuthenticated, getMe)
Router.get('/:id', isAuthenticated, getUserById)
Router.put('/:id', isAuthenticated, updateUser)
Router.delete('/:id', isAuthenticated, deleteUser)

Router.post('/login', login)
Router.post('/signup', createUser)

export default Router