import qs from 'qs'
import { parse } from 'url'
import { remote } from 'electron'
import axios from 'axios'
import { globalConsts } from '../config'

const signInWithPopup = () =>
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
      redirect_uri: globalConsts.GOOGLE_REDIRECT_URI,
      client_id: globalConsts.GOOGLE_CLIENT_ID,
      scope: 'profile email https://www.googleapis.com/auth/tasks',
    }
    const authUrl = `${globalConsts.GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`

    const handleNavigation = (url) => {
      const query = parse(url, true).query
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`))
          authWindow.removeAllListeners('closed')
          setImmediate(() => authWindow.close())
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

const fetchAccessTokens = async (code) => {
  const response = await axios.post(
    globalConsts.GOOGLE_TOKEN_URL,
    qs.stringify({
      code,
      client_id: globalConsts.GOOGLE_CLIENT_ID,
      redirect_uri: globalConsts.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
      client_secret: '1eXu1EtaZrcD57jUI3L2CZeF',
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  )
  return response.data
}

const fetchGoogleProfile = async (accessToken) => {
  const response = await axios.get(globalConsts.GOOGLE_PROFILE_URL, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return response.data
}

export default async () => {
  const code = await signInWithPopup()
  const { access_token, id_token, refresh_token, token_type } = await fetchAccessTokens(code)
  const { id, email, name, verified_email, picture } = await fetchGoogleProfile(access_token)

  const user = {
    id,
    name,
    email,
    picture,
    idToken: id_token,
    tokenType: token_type,
    accessToken: access_token,
    refreshToken: refresh_token,
    verifiedEmail: verified_email,
  }

  global.localStorage.setItem('user', JSON.stringify(user))

  return user
}
