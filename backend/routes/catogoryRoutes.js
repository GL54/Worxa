const express = require('express');
const router = express.Router()
const {addCatogory,getCatogory}=require('./controllers/catogoryController');

router.post('/add', addCatogory)


router.get('/get', getCatogory)


module.exports=router