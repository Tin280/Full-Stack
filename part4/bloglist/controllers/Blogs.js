const BlogsRouter = require('express').Router()
const Blog = require('../models/Blog')

BlogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

BlogsRouter.post('/',async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
})

BlogsRouter.delete('/:id', async (request,response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const body = request.body
    const result = await Blog.findByIdAndUpdate(id, body, {
        new: true
    })
    response.status(200).json(result)
})

module.exports = BlogsRouter