import React from 'react'
import { Button, Segment } from 'semantic-ui-react'
import googleSignIn from '../../../helpers/googleSignIn'

export default ({ setLogin }) => {
  // const [response, setResponse] = useState('')
  const handleLoginClick = async () => {
    const { accessToken = false } = await googleSignIn()

    setLogin(accessToken)
  }

  return (
    <div
      style={{
        display: 'flex',
        backgroundImage: 'url(App/assets/loginBG.jpg)',
        backgroundSize: 'cover',
        height: '100vh',
        margin: 0,
        position: 'relative',
      }}
    >
      <Segment
        style={{
          width: 400,
          margin: 'auto',
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        textAlign="center"
      >
        <p style={{ fontSize: 20, color: '#0b0b8b' }}>Get Start Google Tasks </p>
        <Button basic color="red" content="Choose your Google Account" onClick={handleLoginClick} />
      </Segment>
    </div>
  )
}
