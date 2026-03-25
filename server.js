import express from 'express';
import connectDb from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend Vite app
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));

app.use("/uploads", express.static("uploads"));
app.use(cookieParser());

connectDb();

app.listen(PORT , ()=>{
    console.log("app running on port 3000");
})

// Route Setup

import userRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'

app.use('/api/users' , userRoute);
app.use('/api/posts' , postRoute);
