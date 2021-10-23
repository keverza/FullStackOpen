// import {expect} from "@jest/globals";

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('database cleared')

// const blogObjects = helper.initialBlogs
//     .map(blog => new Blog(blog))
//   const promiseArray = blogObjects.map(blog => blog.save())
//   await Promise.all(promiseArray)

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
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