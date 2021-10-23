const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.length === 0 ? 0 : blogs.reduce((sum, blog) => sum + blog.likes, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  if (blogs.list === 0) {
    return "No blogs found"
  }

  const favorite = blogs.reduce((favor, blog) => (favor.likes > blog.likes ? favor : blog))

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  }

}

const mostBlogs = (blogs) => {
  const bussiestBlogger = _
    .chain(blogs)
    .groupBy('author')
    .map((group, author) => {
      return {
        author: author,
        blogs: group.length
      }
    })
    .maxBy((object) => object.blogs)
    .value()
  console.log("top author", bussiestBlogger)
  return bussiestBlogger

}

const mostLikes = (blogs) => {
  const likedBlogger = _
    .chain(blogs)
    .groupBy('author')
    .map((group, author) => {
      return {
        author: author,
        likes: group.reduce((a, next) => {
          return (a += next.likes)
        }, 0)
      }
  })
    .maxBy((object) => object.likes)
    .value()
  console.log("most liked author", likedBlogger)
  return likedBlogger

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

