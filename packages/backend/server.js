import express from 'express';
import passport from 'passport';
import passportConfig  from './config/passport-config.js';
import session from 'express-session';
import cors from 'cors';

const app = express();
const port = 3000;

import dotenv from 'dotenv'
dotenv.config()
const sessionSecret = process.env.SESSION_SECRET || ''

import mongoose, { mongo } from 'mongoose'
const mongoUrl = process.env.MONGO_URL || ''

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// Configure express-session before passport
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

// Initalize Passport
app.use(passport.initialize());
app.use(passport.session());

//configure passport with google oauth 2.0 strategy
passportConfig(passport)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Routes
app.use('/api/users', userRoutes)
app.use('/auth', authRoutes)

mongoose.connect(mongoUrl).then(() => {
     app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
}).catch((err) => {
    console.log(err);
})
