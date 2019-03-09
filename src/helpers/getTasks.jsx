import axios from 'axios'
import { globalConsts } from '../config'

export const getTaskLists = async () => {
  const { data } = await axios.get(globalConsts.API.LISTS)

  return data
}
export const getTasks = async (idTaskList) => {
  const { data } = await axios.get(`${globalConsts.API.TASKS}/${idTaskList}/tasks/`)

  return data
}
