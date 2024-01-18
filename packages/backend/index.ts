import express, { Request, Response } from 'express';
const app = express();
const port = 3000;

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'
const mongoUrl = process.env.MONGO_URL || ''

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

mongoose.connect(mongoUrl).then(() => {
     app.listen(port, () => console.log(`Example app listening on port ${port}!`)); 
}).catch((err) => {
    console.log(err);
})
