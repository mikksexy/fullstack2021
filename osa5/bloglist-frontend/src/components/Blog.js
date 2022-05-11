import React, { useState } from 'react'
import blogService from './../services/blogs'

const Blog = ({ blog, username, updateBlog }) => {
  const [visible, setVisible] = useState(false)
  const [newLikes, setLikes] = useState(blog.likes)
  const [blogger, setBlogger] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showRemove = { display: blogger ? '' : 'none' }

  const isBlogger = () => {
    if (blog.user.username === username ) setBlogger(!blogger)
    return
  }

  const toggleVisibility = () => {
    isBlogger()
    setVisible(!visible)
  }

  const blogLike = () => {
    setLikes(newLikes + 1)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes + 1,
      user: {
        username: blog.user.username,
        name: blog.user.name,
        id: blog.user.id
      }
    }
    updateBlog(blogObject.id, blogObject)
  }

  const blogRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    try {
      await blogService.remove(blog.id)
      toggleVisibility()
    } catch (error) {
      console.log(error.message)
    }
  }

  return(
    <div>
      <div style={hideWhenVisible} className="hidden">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className="visible">
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>
          likes {newLikes}
          <button onClick={blogLike}>like</button>
        </div>
        <div>{blog.user.name} </div>
        <div style={showRemove}>
          <button onClick={blogRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog