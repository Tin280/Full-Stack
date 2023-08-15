// Finish 4.1-4.7
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const BlogsRouter = require('./controllers/Blogs')
const config = require('./utils/config')
mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.json())
app.use('/api/blogs',BlogsRouter)

module.exports = app