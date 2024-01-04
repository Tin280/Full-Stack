import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('content before clicking view button', () => {
  const blog = {
    title: 'blogtest',
    author: 'authortest',
    url: 'urltest',
    likes: 12
  }
  const user = {
    id: 'test'
  }
  const { container } = render(<Blog blog={blog} user={user}/>)

  const div = container.querySelector('.whenHidden')
  expect(div).toHaveTextContent('blogtest')
  expect(div).toHaveTextContent('authortest')
  expect(div).not.toHaveTextContent('urltest')
  expect(div).not.toHaveTextContent('12')
  screen.debug(div)
})