import express from 'express'
import { getGoogleAuth, getGoogleAuthCallback } from '../controllers/authController'
const router = express.Router()

//Route for initiating Google OAuth process
router.get('/google', getGoogleAuth)

//Route for handling the OAuth callback
router.get('/google/callback', getGoogleAuthCallback)

export default router