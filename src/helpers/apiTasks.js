import axios from 'axios'
import { globalConsts } from '../config'

// GET
export const getTaskLists = async () => {
  const { data } = await axios.get(globalConsts.API.LISTS)

  return data
}

export const getTasks = async (idTaskList) => {
  const { data } = await axios.get(`${globalConsts.API.TASKS}/${idTaskList}/tasks/`)

  return data
}

// POST
export const insertTask = async (idTaskList, body = {}) => {
  const { data } = await axios.post(`${globalConsts.API.TASKS}/${idTaskList}/tasks/`, body)

  return data
}
