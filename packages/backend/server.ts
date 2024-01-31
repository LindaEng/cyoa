import express, { Request, Response } from 'express';
import passport from 'passport';
import passportConfig  from './config/passport-config';
import session from 'express-session';

const app = express();
const port = 3000;


import dotenv from 'dotenv'
dotenv.config()
const sessionSecret = process.env.SESSION_SECRET || ''

import mongoose, { mongo } from 'mongoose'
const mongoUrl = process.env.MONGO_URL || ''

import userRoutes from './routes/userRoutes'
import authRoutes from './routes/authRoutes'

// Configure express-session before passport
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false
}))

// Initalize Passport
app.use(passport.initialize());
app.use(passport.session());

//configure passport with google oauth 2.0 strategy
passportConfig(passport)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

app.use('/api/users', userRoutes)
app.use('/auth', authRoutes)

mongoose.connect(mongoUrl).then(() => {
     app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
}).catch((err) => {
    console.log(err);
})
