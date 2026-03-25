import express from 'express';
import connectDb from './config/db.js'
import cores from 'cores';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const app = express();

dotenv.config();

app.use(express.json());
app.use(cores());
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

connectDb();

app.listen(3000 , ()=>{
    console.log("app running on port 3000");
})

// Route Setup

import userRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'

app.use('/api/user' , userRoute);
app.use('/api/post' , postRoute);
