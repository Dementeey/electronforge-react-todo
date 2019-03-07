import React from 'react'
import { Button } from 'semantic-ui-react'
import googleSignIn from '../../../helpers/googleSignIn'

export default ({ setLogin }) => {
  // const [response, setResponse] = useState('')
  const handleLoginClick = async () => {
    const { accessToken = false } = await googleSignIn()

    setLogin(accessToken)
  }

  return (
    <div>
      <p>Sign in to your google account</p>
      <Button basic color="teal" content="Choose your Google Account" onClick={handleLoginClick} />
    </div>
  )
}
