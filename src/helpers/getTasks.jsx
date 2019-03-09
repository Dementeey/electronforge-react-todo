import axios from 'axios'
import { globalConsts } from '../config'

export const getTaskLists = async () => {
  const { data } = await axios.get(globalConsts.TASKS.LISTS)

  return data
}
export const getTasks = async () => {
  const { data } = await axios.get(
    'https://www.googleapis.com/tasks/v1/users/@me/lists/MDA0NjIxMjUxNDA1MzE1MjA4MjY6MzEwNjU3MTU4ODAwOTk4MDow',
  )

  return data
}
