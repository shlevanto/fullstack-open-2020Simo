import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from './CreateBlogForm'

test('updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <CreateBlogForm createBlog={ createBlog } />
  )

  const title = component.container.querySelector('input')

  fireEvent.change(title, {
    target: { value: 'I can has blog' }
  })
  console.log(title)

})