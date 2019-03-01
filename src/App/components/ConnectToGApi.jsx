import React from 'react'
import qs from 'qs'
import { parse } from 'url'
import { remote } from 'electron'
import axios from 'axios'
import * as config from '../../config'

export const signInWithPopup = () =>
  // eslint-disable-next-line no-unused-vars
  new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true,
    })

    // TODO: Generate and validate PKCE code_challenge value
    const urlParams = {
      response_type: 'code',
      redirect_uri: config.GOOGLE_REDIRECT_URI,
      client_id: config.GOOGLE_CLIENT_ID,
      scope: 'profile email',
    }
    const authUrl = `${config.GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    const handleNavigation = (url) => {
      const query = parse(url, true).query
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`))
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed')
          setImmediate(() => authWindow.close())

          // This is the authorization code we need to request tokens
          resolve(query.code)
        }
      }
    }

    authWindow.on('closed', () => {
      // TODO: Handle this smoothly
      throw new Error('Auth window was closed by user')
    })

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url)
    })

    authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
      handleNavigation(newUrl)
    })

    authWindow.loadURL(authUrl)
  })

export async function fetchAccessTokens(code) {
  const response = await axios.post(
    config.GOOGLE_TOKEN_URL,
    qs.stringify({
      code,
      client_id: config.GOOGLE_CLIENT_ID,
      redirect_uri: config.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  return response.data
}

export async function fetchGoogleProfile(accessToken) {
  const response = await axios.get(config.GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}
export const googleSignIn = async () => {
  const code = await signInWithPopup()
  const tokens = await fetchAccessTokens(code)
  const { id, email, name } = await fetchGoogleProfile(tokens.access_token)
  const providerUser = {
    uid: id,
    email,
    displayName: name,
    idToken: tokens.id_token,
  }

  console.log('===============providerUser=====================')
  console.log(providerUser)
  console.log('====================================')
  // return mySignInFunction(providerUser)
  return providerUser
}
export default () => {
  // const [response, setResponse] = useState('')
  const handleLoginClick = () => googleSignIn()

  return (
    <div>
      <p>Google Tasks API</p>
      response
      <button onClick={handleLoginClick}>Login</button>
    </div>
  )
}
