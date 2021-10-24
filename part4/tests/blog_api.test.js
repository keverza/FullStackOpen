// import {expect} from "@jest/globals";

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const Blog = require('../models/blog')
const globals = {}

beforeEach(async () => {

  const savedUsers = await helper.usersInDb()

  const userForTest = {
    username: savedUsers[0].username,
    id: savedUsers[0].id,
  }

  const token = jwt.sign(userForTest, process.env.SECRET)

  globals.token = `bearer ${token}`
  globals.tokenId = userForTest.id
})

//   let blogObject = new Blog(helper.initialBlogs[0])
//   await blogObject.save()
//   blogObject = new Blog(helper.initialBlogs[1])
//   await blogObject.save()
// })

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('total number of blogs', async () => {
    const response = await api.get('/')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id', async () => {
    const response = await api.get('/')
    expect(response.body[0].id).toBeDefined()
  })

  test('the first blog is about Javascript', async () => {
    const response = await api.get('/')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Browser can execute only Javascript')
  })

})

describe('testing blogs validations', () => {
  test('a valid blog can be added', async () => {
    const newBlog = helper.validBlog
    console.log(newBlog)
    await api
      .post('/')
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(
      'Lets start with the operation for adding a new note.'
    )
  })

  test('blog without likes has default value', async () => {
    const newBlog = helper.noLikesBlog

    const response = await api
      .post('/')
      .set('Authorization', globals.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect('Content-Type', /application\/json/)
      .expect(200)

    expect(response.body.likes).toBe(0)
  })

  test('blog without content and url', async () => {
    const newBlog = helper.invalidBlog
    await api
      .post('/')
      .set('Authorization', globals.token)
      .send(newBlog)
      .set('Content-Type', 'application/json')
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

})
afterAll(() => {
  mongoose.connection.close()
})