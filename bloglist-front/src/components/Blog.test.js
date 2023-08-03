import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog rendering', () => {
  let mockHandler
  let container
  let dummyUser

  beforeEach(() => {
    const blog = {
      title: 'Testing',
      author: 'Test Man',
      url: 'test.com',
      likes: 10,
      user: { name: 'dummy' }
    }
  
    dummyUser = { name: 'dummy' }

    mockHandler = jest.fn()
    container = render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler} user={dummyUser}/>).container
  })

  test('renders content', () => {
    expect(container.querySelector('.blog'))
      .toHaveTextContent('Test Man', 'Testing')
    expect(container.querySelector('.details'))
      .toHaveStyle('display: none')
  })

  test('clicking the view button reveals blog details', async () => {
    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    expect(container.querySelector('.details'))
      .toHaveStyle('display: block')
  })

  test('clicking the like button twice results in two calls to handleLike', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)
    expect(mockHandler.mock.calls)
      .toHaveLength(2)
  })
})