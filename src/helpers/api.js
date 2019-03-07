import axios from 'axios'

export default (url, options, method = 'get') => {
  const { accessToken = '' } = JSON.parse(global.localStore.getItem('user'))

  const wrapOptions = {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  return axios[method](url, {
    ...wrapOptions,
  })
}
