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

  console.log('blog to be added', newObject)

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {

  const blogUrl = `${baseUrl}/${newObject.id}`

  const response = await axios.put(blogUrl, newObject)
  return response.data
}

const remove = async (newObject) => {

  const blogUrl = `${baseUrl}/${newObject.id}`
  console.log(newObject.token)
  const thisToken =  `Bearer ${newObject.token}`

  const config = {
    headers: { Authorization: thisToken },
  }

  const response = await axios.delete(blogUrl, config)
  return response.data

}



export default { getAll, create, setToken, update, remove }