import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongoodb.js'
import { connect } from 'mongoose'
import connectCloudinary from './config/cloudinary.js'

import reviewRouter from './routes/reviewRouter.js';
import adminRouter from './routes/adminRouter.js'
//app.config
const app=express()
const port= process.env.port || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

app.use('/api/books', adminRouter);
app.use('/api/reviews', reviewRouter);
//api endpoint
app.use('/api/admin',adminRouter)

// loaclhost:400/api/admin



app.get('/',(req,res)=>{
res.send('API WORKING')
})

app.listen(port, ()=>console.log("server started", port))