export default () => {
  global.localStorage.removeItem('user')
  global.location.reload()
}
