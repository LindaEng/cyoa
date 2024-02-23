import express from 'express'
const Router = express.Router()

import isAuthenticated from '../middleware/isAuthenticated.js'
import { getLessons, getLessonById, getSection, getPageById, createLesson, updateLesson, updatePage, updateSection, deleteLesson } from '../controllers/lessonController.js'

//CRUD
Router.get('/', isAuthenticated, getLessons)
Router.get('/:id', isAuthenticated, getLessonById)
Router.get('/:lessonId/sections/:sectionTitle', isAuthenticated, getSection)
Router.get('/:lessonId/sections/:sectionTitle/pages/:pageId', isAuthenticated, getPageById)
Router.post('/', isAuthenticated, createLesson)
Router.put('/:userId/:id', isAuthenticated, updateLesson)
Router.put('/:lessonId/sections/:sectionTitle/pages/:pageId', isAuthenticated, updatePage)
Router.put('/:lessonId/sections/:sectionTitle', isAuthenticated, updateSection)
Router.delete('/:userId/:lessonId', isAuthenticated, deleteLesson)


export default Router 