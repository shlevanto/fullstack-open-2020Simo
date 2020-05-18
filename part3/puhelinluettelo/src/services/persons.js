import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => {
    const request = axios.get(baseURL)

    return (
        request.then(response => response.data)
    )

}

const create = (newObject) => {
    const request = axios.post(baseURL, newObject)

    return (
        request.then(response => response.data)
    )
}

const remove = (id) => {
    

    return (
        axios.delete(`${baseURL}/${id}`)

    )
}

const update = (id, newObject) => {
        
    return axios.put(`${baseURL}/${id}`, newObject)
}

export default {getAll, create, remove, update}