const BlogsRouter = require('express').Router()
const Blog = require('../models/Blog')


const { userExtractor, tokenExtractor } = require('../utils/middleware')


BlogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)

})

BlogsRouter.post('/',tokenExtractor,userExtractor,async (request, response) => {
    const body = request.body
    const user = request.body.user


    // console.log('hehe',user)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const result = await blog.save()
    // const test = User.findById(blog._id)
    // console.log(test)
    user.blogs = user.blogs.concat(result._id)
    await user.save()
    response.status(201).json(result)
})

BlogsRouter.delete('/:id',tokenExtractor,userExtractor, async (request,response) => {
    const user = request.body.user
    const blog = await Blog.findById(request.params.id)
    // console.log(blog)
    if(blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }
    else {
        response.status(404)
    }

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

//xong 4.21