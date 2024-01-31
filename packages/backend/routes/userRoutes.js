import express from 'express'
const Router = express.Router()

import {getUsers, getUserById, createUser} from '../controllers/userController'



//CRUD
Router.get('/', getUsers)
Router.get('/:id', getUserById)
Router.post('/', createUser)
// Router.put('/:id')
// Router.delete('/:id')


export default Router