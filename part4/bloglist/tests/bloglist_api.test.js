const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/Blog')
const helper = require('./blogtest_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})
//4.8

describe('Get the blogs and check content', () => {
    test('JSON is returned as content', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    },100000)
    test('GET the correct amount of blog posts returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    },100000)
})


//4.9

describe('Check identify', () => {
    test('The unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    },100000)
})


//4.10

describe('Test Post request', () => {

    test('Successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'Why Every Developer should Learn Docker in 2023',
            author: 'javinpaul',
            url: 'https://dev.to/javinpaul/why-every-developer-should-learn-docker-in-2022-2ndi',
            likes: '103',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const contents = blogsAtEnd.map(b => b.title)
        expect(contents).toContain(
            'Why Every Developer should Learn Docker in 2023'
        )
    },100000)
})


//4.11
describe('Check like of the blog', () => {

    test('verifies that if the likes property is missing from the request',async () => {
        const newBlog = {
            title: 'Why Every Developer should Learn Docker in 2022',
            author: 'javinpaul',
            url: 'https://dev.to/javinpaul/why-every-developer-should-learn-docker-in-2022-2ndi',
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDb()
        const contents = blogsAtEnd.map(blogArray => blogArray.likes)
        expect(contents[contents.length -1]).toEqual(0)
    },100000)
})


//4.12
describe('Check url and title from post request', () => {

    test('return 400 Bad Request if url is missing', async () => {
        const newBlog = {
            title: 'Sample Blog Title',
            author: 'johndoe'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        expect(response.body).toEqual({
            error: 'Blog validation failed: url: Path `url` is required.'
        })
    }, 100000)

    test('return 400 Bad Request if tiltle is missing', async () => {
        const newBlog = {
            url : 'https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12',
            author: 'johndoe'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        expect(response.body).toEqual({
            error: 'Blog validation failed: title: Path `title` is required.'
        })
    },100000)

})

//4.13

describe('Test delete', () => {
    test(' deleting a single blog post resource', async () => {
        const BlogAtStart = await helper.blogsInDb()
        const BlogtoDelete = BlogAtStart[1]
        await api
            .delete(`/api/blogs/${BlogtoDelete.id}`)
            .expect(204)
        const BlogAfterDelete = await helper.blogsInDb()

        expect(BlogAfterDelete).toHaveLength(helper.initialBlogs.length - 1)

        const blogtitle = BlogAfterDelete.map(t => t.title)
        expect(blogtitle).not.toContain(BlogtoDelete.title)
    },100000)
})

//4.14

describe('Test put', () => {
    test('updating the information of an individual blog post', async () => {
        const updateBlog = {
            title : 'change the title',
            url : 'change url',
            author: 'Tin',
            likes: 123
        }
        const BlogAtStart = await helper.blogsInDb()
        const BlogtoUpdate = BlogAtStart [1]
        await api
            .put(`/api/blogs/${BlogtoUpdate.id}`)
            .send(updateBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const BlogAfterUpdate = await helper.blogsInDb()
        expect(BlogAfterUpdate).not.toContain(BlogtoUpdate)

    },100000)

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await  bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()

    })
    test('success to create a new username ', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'DavidT',
            name: 'TT',
            password: '113'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length +1 )

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    },100000)

    test('Invalid username will not save and create',async() =>{
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'root',
            name: 'TT',
            password: '123'
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)


        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd =await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    },100000)
},100000)

afterAll(async () => {
    await mongoose.connection.close()
})