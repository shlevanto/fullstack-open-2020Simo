import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    author: 'LolCat',
    title: 'I can has blog',
    url: 'www',
    likes: 100,
    user: 1
  }

  const component = render (
    <Blog blog={blog} loggedUser={1} />
  )

  // tapa 1, katsoo onko komponentissa lainkaan tätä tekstiä
  expect(component.container).toHaveTextContent(
    'I can has blog'
  )

  // tapa 2, palauttaa elementin jossa on määritelty teksti
  /*
  const element = component.getByText(
    'LolCat'
  )
  expect(element).toBeDefined()
*/

  // tapa 3, etsii komponentin sisältä tietyn elementin css-selectorin avulla
  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'LolCat'
  )

  expect(div).toHaveTextContent(
    'I can has blog'
  )

  expect(div).not.toHaveTextContent(
    'www'
  )

  expect(div).not.toHaveContent(
    '100'
  )



})