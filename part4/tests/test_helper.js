const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'The following command only runs the tests found in the tests/note_api.test.js file',
    author: 'John Smith',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
    likes: 10
  },
  {
    title: 'Browser can execute only Javascript',
    author: 'John Smith',
    url: 'https://fullstackopen.com/en/part4/testing_the_backend#test-environment',
    likes: 5
  },
]

const validBlog = {
  title: 'Lets start with the operation for adding a new note.',
  author: 'John Smith',
  url: 'fullstackopen.com/en/part4/testing_the_backend#test-environment',
  likes: 7
}

const noLikesBlog = {
  title: 'Blog about blog',
  author: 'Mr. Author',
  url: 'url.com'

}

const invalidBlog = {
  author: 'Mr. Author',
  likes: 10
}


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const testUser = {
  name: 'exUser',
  username: 'test',
  password: 'test',
}

module.exports = {
  initialBlogs,
  blogsInDb,
  validBlog,
  noLikesBlog,
  invalidBlog,
  usersInDb,
  testUser
}