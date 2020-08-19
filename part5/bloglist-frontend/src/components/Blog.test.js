import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/react'
import Blog from './Blog'

  const blog = {
    author: 'LolCat',
    title: 'I can has blog',
    url: 'www',
    likes: 100,
    user: 1
  }

test('blog renders default content, title and author', () => {
  /*const blog = {
    author: 'LolCat',
    title: 'I can has blog',
    url: 'www',
    likes: 100,
    user: 1
  }*/

  const component = render (
    <Blog blog={blog} loggedUser={1} />
  )

  // tulostaa konsoliin halutun elementin
  // const part = component.container.querySelector('button')
  //console.log(prettyDOM(part))

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

  //author
  expect(div).toHaveTextContent(
    'LolCat'
  )

  //title
  expect(div).toHaveTextContent(
    'I can has blog'
  )

  //not url
  expect(div).not.toHaveTextContent(
    'www'
  )

  //not likes
  expect(div).not.toHaveTextContent(
    '100'
  )
})
test('view details', () => {

  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} loggedUser={1} toggle={mockHandler} visibility={false}/>
  )

  const button = component.getByText('view')

  const div = component.container.querySelector('.details')

  // details osiota ei näytetä oletusarvoisesti
  expect(div).toHaveStyle('display: none')

  // klikataan view
  fireEvent.click(button)

  // details -osio näytetään
  expect(div).not.toHaveStyle('display: none')

  // tarkistataan, että kaikki sisällöt näkyvät
  expect(div).toHaveTextContent('LolCat')
  expect(div).toHaveTextContent('I can has blog')
  expect(div).toHaveTextContent('www')
  expect(div).toHaveTextContent('100')

})

test('like blogs button calls likeBlog function from App.js', () => {
  const mockHandler = jest.fn()

  const component = render (
    <Blog blog={blog} loggedUser={1} likeBlog={mockHandler} visibility={false}/>
  )

  const button = component.getByText('like')

  // klikataan like
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})


