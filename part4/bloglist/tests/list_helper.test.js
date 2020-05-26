const listHelper = require('../utils/list_helper')

const listOfBlogs = [ 
  { 
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7, 
    __v: 0 
  }, 
  { 
    _id: '5a422aa71b54a676234d17f8', 
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 
    likes: 5, 
    __v: 0 
  }, 
  { 
    
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 
    likes: 12, 
    __v: 0 
  }, 
  { 
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 
    likes: 10, 
    __v: 0 
  }, 
  { 
    _id: '5a422ba71b54a676234d17fb', 
    title: 'TDD harms architecture', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 
    likes: 0, 
    __v: 0 
  },
  { 
    _id: '5a422bc61b54a676234d17fc', 
    title: 'Type wars', 
    author: 'Robert C. Martin', 
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
    likes: 2, 
    __v: 0 
  }
]

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

// tests begin here
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

  test('of list with one item is equal to likes of that item', () => {

    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('of list with many items', () => {

    const result = listHelper.totalLikes(listOfBlogs)
    expect(result).toBe(36)
    
  })
})

describe('favorite blog', () => {
  test('of empty list returns error message', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe('No blogs')
  })
  
  test('of list with one item', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result.title).toEqual(listWithOneBlog[0].title)
  })
  
  test('of list with many items', () => {
    const result = listHelper.favoriteBlog(listOfBlogs)
    expect(result.title).toEqual('Canonical string reduction')
  })
  
})