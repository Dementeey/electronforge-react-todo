// import { google } from 'googleapis'
import axios from 'axios'
import { globalConsts } from '../config'

export default async () => {
  const { accessToken } = JSON.parse(global.localStorage.getItem('user'))

  const { data } = await axios.get(globalConsts.TASKS.LISTS, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return data
}
