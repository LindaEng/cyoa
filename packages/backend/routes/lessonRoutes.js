import express from 'express'
const Router = express.Router()

import isAuthenticated from '../middleware/isAuthenticated.js'
import { getLessons, getLessonById, createLesson, updateLesson, deleteLesson } from '../controllers/lessonController.js'

//CRUD
Router.get('/', isAuthenticated, getLessons)
Router.get('/:id', isAuthenticated, getLessonById)
Router.post('/', isAuthenticated, createLesson)
Router.put('/:userId/:id', isAuthenticated, updateLesson)
Router.delete('/:userId/:lessonId', isAuthenticated, deleteLesson)


export default Router 