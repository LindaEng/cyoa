import express from 'express'
import {postChat} from '../controllers/chatController.js'
import isAuthenticated from '../middleware/isAuthenticated.js'
const Router = express.Router()

Router.post('/', isAuthenticated, postChat)


export default Router