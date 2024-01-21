import express from 'expresss'
import { getGoogleAuth, getGoogleAuthCallback } from '../controllers/authController'
const router = express.Router()

//Route for initiating Google OAuth process
router.get('/auth/google', getGoogleAuth)

//Route for handling the OAuth callback
router.get('/auth/google/callback', getGoogleAuthCallback)

export default router