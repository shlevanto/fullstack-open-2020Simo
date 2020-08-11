require('dotenv').config()

let PORT = process.env.PORT
let url = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_MONGODB_URI
  console.log(url)
  
}
module.exports = {
  url,
  PORT
}