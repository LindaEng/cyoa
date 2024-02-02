import express from 'express'
const Router = express.Router()

import {getUsers, getUserById, createUser} from '../controllers/userController'
import isAuthenticated from '../middleware/isAuthenticated'


//CRUD
Router.get('/', isAuthenticated, getUsers)
Router.get('/:id', isAuthenticated, getUserById)
Router.post('/', isAuthenticated, createUser)
// Router.put('/:id')
// Router.delete('/:id')



export default Router