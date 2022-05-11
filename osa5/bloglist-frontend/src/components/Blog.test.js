import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', async () => {
  const blog = {
    title: 'kissa',
    author: 'kappa keepo',
    url: 'asdasdasd.com',
    likes: 2,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '61bf0076b1018b3d2ed93439'
    }
  }

  render(<Blog blog={blog} username={blog.user.username} />)

  const element = await screen.findAllByText('kissa', { exact: false })
  expect(element).toBeDefined()

  const element2 = await screen.findAllByText('kappa keepo', { exact: false })
  expect(element2).toBeDefined()
})

test('renders title and author but does not render likes or url', async () => {
  const blog = {
    title: 'kissa',
    author: 'kappa keepo',
    url: 'asdasdasd.com',
    likes: 2,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '61bf0076b1018b3d2ed93439'
    }
  }

  const { container } = render(<Blog blog={blog} username={blog.user.username} />)

  const div = container.querySelector('.hidden')
  expect(div).not.toHaveTextContent('asdasdasd.com')
  expect(div).not.toHaveTextContent('2')
  expect(div).toHaveTextContent('kissa')
  expect(div).toHaveTextContent('kappa keepo')
})

test('after clicking view url and likes are displayed', () => {
  const blog = {
    title: 'kissa',
    author: 'kappa keepo',
    url: 'asdasdasd.com',
    likes: 2,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '61bf0076b1018b3d2ed93439'
    }
  }

  const { container } = render(<Blog blog={blog} username={blog.user.username} />)
  const button = screen.getByText('view')
  userEvent.click(button)

  const div = container.querySelector('.visible')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toHaveTextContent('asdasdasd.com')
  expect(div).toHaveTextContent('2')
})

test('clicking the like button calls event handler twice', async () => {
  const blog = {
    title: 'kissa',
    author: 'kappa keepo',
    url: 'asdasdasd.com',
    likes: 2,
    user: {
      username: 'hellas',
      name: 'Arto Hellas',
      id: '61bf0076b1018b3d2ed93439'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} username={blog.user.username} updateBlog={mockHandler}/>)

  const buttonView = screen.getByText('view')
  userEvent.click(buttonView)

  const buttonLike = screen.getByText('like')
  userEvent.click(buttonLike)
  userEvent.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})