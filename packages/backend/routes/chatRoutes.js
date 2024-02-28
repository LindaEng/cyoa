import express from 'express'
import {postChat, postSectionChat, postQuizChat} from '../controllers/chatController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
const Router = express.Router()

Router.post('/', isAuthenticated, postChat)
Router.post('/section', isAuthenticated, postSectionChat)
Router.post('/quiz', isAuthenticated, postQuizChat)

export default Router