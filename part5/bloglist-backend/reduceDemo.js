const _ = require('lodash')

const info = [
  {
    name: 'a',
    value: 3
  },
  {
    name: 'a',
    value: 5
  },
  {
    name: 'c',
    value: 1
  }
]

const item = _.orderBy(_.groupBy(info, 'name'),'length','desc')[0]

console.log(item)

const sum = 
_.reduce(item.map(item => item.value), (sum, n) => {
  return sum + n
}, 0)

const amount = item.length

console.log(amount)

console.log(item[0].name, sum)

const author = {
  name: item[0].name,
  value: sum
}
console.log(author)
