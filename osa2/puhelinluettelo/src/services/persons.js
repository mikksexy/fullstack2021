import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = async () => {
  const request = axios.get(baseUrl)
    const response = await request
  return response.data
  }
  
const create = async newObject => {
  const request = axios.post(baseUrl, newObject)  
  const response = await request
  return response.data
  }

const remove = async (id) => {
  const url = `${baseUrl}/${id}`
  const request = axios.delete(url)
  const response = await request
  return response.data
}

const update = async (id, newName, newNumber) => {
  const url = `${baseUrl}/${id}`
  const request = axios.put(url, {
    name: newName,
    number: newNumber
  })
  const response = await request
  return response.data
}

const exportedObject = {
    getAll,
    create,
    remove,
    update
}

export default exportedObject