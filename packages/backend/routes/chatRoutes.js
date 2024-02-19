import express from 'express'
import {postChat, postSectionChat} from '../controllers/chatController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
const Router = express.Router()

Router.post('/', isAuthenticated, postChat)
Router.post('/section', isAuthenticated, postSectionChat)


export default Router