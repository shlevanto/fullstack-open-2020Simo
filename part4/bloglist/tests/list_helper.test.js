const listHelper = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test.only('of list with one item is equal to likes of that item', () => {
    const listWithOneBlog = [
      {
        _id: '1',
        title: 'The one item test blog',
        author: 'Testy McTestyface',
        url: 'www.testland.te',
        likes: 5,
        __v: 0
      }
    ]

    console.log(listWithOneBlog[0].likes)
    
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })
})