const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  })
  const savedBlog = await blog.save()

  response.json(savedBlog.toJSON())

  // blog
  //   .save()
  //   .then((savedBlog) => savedBlog.toJSON())
  //   .then((savedAndFormattedBlog) => response.json(savedAndFormattedBlog))
  //   .catch((error) => next(error))

})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if(!blog) return response.status(404).end()

  await Blog.findByIdAndRemove(request.params.id)

  return response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = request.body

  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()

  blog.author = blogToUpdate.author
  blog.title = blogToUpdate.title
  blog.url = blogToUpdate.url
  blog.likes = blogToUpdate.likes

  const updatedBlog = await blog.save()

  return response
    .json(updatedBlog.toJSON())
    .status(200)
    .end()
})

module.exports = blogsRouter