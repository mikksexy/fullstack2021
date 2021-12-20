// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach(blog => {
    sum += blog.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  let mostLiked = blogs[0]
  let mostLikes = 0
  blogs.forEach(blog => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes
      mostLiked = blog
    }
  })
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes
  }
}

const mostBlogs = (blogs) => {
  let countedBlogs = [
    ...blogs.reduce((a, b) => {
      a.set(b.author, a.has(b.author) ? a.get(b.author) + 1 : 1)
      return a
    }, new Map)
  ].reduce((a, b) => {
    let [author, blogs] = [...b]
    return a.concat({ author, blogs })
  }, [])
  const blogsSorted = countedBlogs.sort((a, b) => {
    return b.blogs - a.blogs
  })
  return blogsSorted[0]
}

const mostLikes = (blogs) => {
  let countedLikes = [
    ...blogs.reduce((a, b) => {
      a.set(b.author, a.has(b.author) ? a.get(b.author) + b.likes : b.likes)
      return a
    }, new Map)
  ].reduce((a, b) => {
    let [author, likes] = [...b]
    return a.concat({ author, likes })
  }, [])
  const LikesSorted = countedLikes.sort((a, b) => {
    return b.likes - a.likes
  })
  return LikesSorted[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}