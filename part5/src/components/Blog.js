import React, { useState } from 'react'

const Blog = ({ blog, likeBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(state => !state)
  }

  const blogStyle = {
    width: '300px',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderWidth: 0,
    backgroundColor: '#CDCDCD',
    marginBottom: 2
  }

  const buttonStyle = {
    backgroundColor: '#CDCDCD',
    border: 'none',
    color: 'white',
    padding: '2px 2px',
    textAlign: 'right',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '12px',
  }

  if(showDetails){
    return(
      <div className='blog' style={blogStyle} key={blog.id}>
        <span className='title'>{blog.title}</span>
        <button style={buttonStyle} onClick={toggleShowDetails}>Hide</button>
        <div>
          Url: {blog.url}
        </div>
        <div>
          Likes: {blog.likes}
          <button style={buttonStyle} onClick={(event) => likeBlog(event, blog.id)}>👍</button>
        </div>
        <div>
          author: {blog.author}
        </div>
        <button style={buttonStyle} onClick={(event) => removeBlog(event, blog.id, blog.title)}>🗑️</button>
      </div>
    )
  }

  return(
    <div className='blog' style={blogStyle} key={blog.id}>
      {blog.title} {blog.author}
      <button style={buttonStyle} onClick={toggleShowDetails}>👁️</button>
    </div>
  )
}

export default Blog