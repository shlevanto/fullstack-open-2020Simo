import axios from 'axios'
//const baseUrl = '/api/notes'
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)

    const nonExisting = {
        id: 999999,
        date: '2019-05-30T17:30:31.0987Z',
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

// tehokkaammin

export default {getAll, create, update}
/*
export default {
    getAll: getAll,
    create: create,
    update: update
}
*/