const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
var bodyParser = require('body-parser')

connectDB();
const port = process.env.PORT || 5000

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/user', require('./routes/userRoutes'))
app.use('/catogory', require('./routes/catogoryRoutes'))



app.listen(port,()=>{console.log(`Server started on port ${port}`)})