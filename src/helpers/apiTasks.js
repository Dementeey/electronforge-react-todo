import axios from 'axios'
import { globalConsts } from '../config'

// GET
export const getTaskLists = async () => {
  const { data } = await axios.get(globalConsts.API.LISTS)

  return data
}

export const getTasks = async (taskList, maxResults = 200) => {
  const { data } = await axios.get(
    `${globalConsts.API.TASKS}/${taskList}/tasks?maxResults=${maxResults}&&showHidden=true`,
  )

  return data
}

// POST
export const insertList = async (body = {}) => {
  const { data } = await axios.post(`${globalConsts.API.LISTS}`, body)

  return data
}

export const insertTask = async (taskList, body = {}) => {
  const { data } = await axios.post(`${globalConsts.API.TASKS}/${taskList}/tasks/`, body)

  return data
}

// PUT
export const completeTask = async (taskList, task, body = {}) => {
  const { data } = await axios.put(`${globalConsts.API.TASKS}/${taskList}/tasks/${task}`, body)

  return data
}
