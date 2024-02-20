import express from 'express'
const Router = express.Router()

import isAuthenticated from '../middleware/isAuthenticated.js'
import { getLessons, getLessonById, createLesson, updateLesson, updateSection, deleteLesson } from '../controllers/lessonController.js'

//CRUD
Router.get('/', isAuthenticated, getLessons)
Router.get('/:id', isAuthenticated, getLessonById)
Router.post('/', isAuthenticated, createLesson)
Router.put('/:userId/:id', isAuthenticated, updateLesson)
Router.put('/:lessonId/sections/:sectionTitle', isAuthenticated, updateSection)
Router.delete('/:userId/:lessonId', isAuthenticated, deleteLesson)


export default Router 