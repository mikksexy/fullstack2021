import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)


  const inputs = screen.getAllByRole('textbox')

  const createButton = screen.getByText('create')

  userEvent.type(inputs[0], 'otsikko')
  userEvent.type(inputs[1], 'kirjoittaja')
  userEvent.type(inputs[2], 'nettisivut')
  userEvent.click(createButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('otsikko')
  expect(createBlog.mock.calls[0][0].author).toBe('kirjoittaja')
  expect(createBlog.mock.calls[0][0].url).toBe('nettisivut')
})