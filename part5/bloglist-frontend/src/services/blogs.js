import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  console.log('blogservice token', token)
  
  const config = {
    headers: { Authorization: token},
  }
  
  console.log('item sent to backend', newObject, config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  console.log('newObject in blogService', newObject)
  
  const blogUrl = `${baseUrl}/${newObject.id}`
  console.log(blogUrl)
  
  const response = await axios.put(blogUrl, newObject)
  return response.data
}



export default { getAll, create, setToken, update }