import React from 'react'
import googleSignIn from '../../helpers/googleSignIn'
import getTasks from '../../helpers/getTasks'

export default () => {
  // const [response, setResponse] = useState('')
  const handleLoginClick = async () => {
    console.log('==========login==========================')
    console.log(await googleSignIn())
    console.log('====================================')
  }

  const handleTasksClick = async () => {
    console.log('===task=================================')
    console.log(await getTasks())
    console.log('====================================')
  }

  return (
    <div>
      <p>Google Tasks API</p>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleTasksClick}>get task</button>
    </div>
  )
}
