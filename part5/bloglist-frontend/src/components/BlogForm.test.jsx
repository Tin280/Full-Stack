import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const handleCreateBlog = jest.fn()
  const setNotification = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleCreateBlog={handleCreateBlog} setNotification={setNotification} />)
  const titleInput = screen.getByPlaceholderText('write title here')
  const authorInput = screen.getByPlaceholderText('write author here')
  const urlInput = screen.getByPlaceholderText('write url here')
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'title')
  await user.type(authorInput, 'author')
  await user.type(urlInput, 'http://localhost.com')
  await user.click(sendButton)

  expect(handleCreateBlog.mock.calls).toHaveLength(1)
  console.log(handleCreateBlog.mock.calls[0][0])
  expect(handleCreateBlog.mock.calls[0][0].title).toBe('title')
  expect(handleCreateBlog.mock.calls[0][0].author).toBe('author')
  expect(handleCreateBlog.mock.calls[0][0].url).toBe('http://localhost.com')
})