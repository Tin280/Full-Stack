const Blog = require('../models/Blog')
const User = require('../models/user')
const initialBlogs = [
    {
        title: 'Top 10 reasons why you should learn React right now',
        author: 'Mohammad Ayub',
        url: 'https://medium.com/@SilentHackz/top-10-reasons-why-you-should-learn-react-right-now-f7b0add7ec0d',
        likes: '110',
    },
    {
        title: '8 Reasons You Should Learn React',
        author: 'NOBLE OKAFOR',
        url: 'https://www.makeuseof.com/react-learn-reasons-why/',
        likes: '50',
    }
]

const nonExistingId = async () => {
    const note = new Blog({ content: 'willremovethissoon' })
    await note.save()
    await note.deleteOne()

    return note._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb,usersInDb
}