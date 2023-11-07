const BlogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { tokenExtractor } = require('../utils/middleware')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

BlogsRouter.get('/',async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)

})

BlogsRouter.post('/',tokenExtractor,async (request, response) => {
    const body = request.body
    const decodeToken = jwt.verify(request.body.token, process.env.SECRET)
    if (!decodeToken.id) {
        return response.status(401).json( { error: 'token invalid' })
    }

    const user = await User.findById(decodeToken.id)
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