import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const createNew = async (content) => {
  const object = { content, id: getId(), votes:0 }
  
  const res = await axios.post(baseUrl, object)
  return res.data
}

const update = async (id) => {
  // get anecdote to update
  const object = await axios.get(`${baseUrl}/${id}`)
  
  // create new variable for updated votes
  const updatedVotes = object.data.votes + 1
  
  // compose new object
  const newObject = { 
    content: object.data.content,
    id: object.data.id,
    votes: updatedVotes }
  
  // put to server
  const res = await axios.put(`${baseUrl}/${id}`, newObject)
  
  return res.data
}

export default { getAll, createNew, update }