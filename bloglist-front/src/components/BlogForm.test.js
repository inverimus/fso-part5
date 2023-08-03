import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('handler called with correct details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  
  render(<BlogForm createBlog={createBlog}/>)
  
  const title = screen.getByTestId('title')
  const author = screen.getByTestId('author')
  const url = screen.getByTestId('url')
  const submit = screen.getByText('create')

  await user.type(title, 'test title')
  await user.type(author, 'test author')
  await user.type(url, 'test url')

  await user.click(submit)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({ title: 'test title', author: 'test author', url: 'test url' })
})