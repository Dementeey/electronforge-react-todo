/* eslint-disable no-use-before-define */
import React, { useRef, useEffect } from 'react'
import { GOOGLE_API_KEY, GOOGLE_CLIENT__ID } from '../../config'

export default () => {
  // Client ID and API key from the Developer Console
  const CLIENT_ID = GOOGLE_CLIENT__ID
  const API_KEY = GOOGLE_API_KEY
  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest']
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = 'https://www.googleapis.com/auth/tasks.readonly'
  const authorizeButton = useRef(null)
  const signoutButton = useRef(null)
  /**
   *  On load, called to load the auth2 library and API client library.
   */
  useEffect(() => handleClientLoad())

  function handleClientLoad() {
    console.log('============================load========')
    console.log(gapi)
    console.log('====================================')
    gapi.load('client:auth2', initClient)
  }
  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })
      .then(
        (r) => {
          console.log('=========r===========================')
          console.log(r)
          console.log('====================================')
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
          // authorizeButton.onclick = handleAuthClick
          // signoutButton.onclick = handleSignoutClick
        },
        (error) => {
          appendPre(JSON.stringify(error, null, 2))
          console.log('===========error=========================')
          console.log(error)
          console.log('====================================')
        },
      )
  }
  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      console.log('====isSignedIn================================')
      console.log(isSignedIn)
      console.log('====================================')
      authorizeButton.current.style.display = 'none'
      signoutButton.current.style.display = 'block'
      listTaskLists()
    } else {
      console.log('=======not isSignedIn=============================')
      console.log(isSignedIn)
      console.log('====================================')
      authorizeButton.current.style.display = 'block'
      signoutButton.current.style.display = 'none'
    }
  }
  /**
   *  Sign in the user upon button click.
   */
  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn()
  }
  /**
   *  Sign out the user upon button click.
   */
  function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
  }
  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    console.log('======message==============================')
    console.log(message)
    console.log('====================================')
    console.log('====================================')
    console.log(authorizeButton.current)
    console.log('====================================')
  }
  /**
   * Print task lists.
   */
  function listTaskLists() {
    gapi.client.tasks.tasklists
      .list({
        maxResults: 10,
      })
      .then((response) => {
        appendPre('Task Lists:')
        const taskLists = response.result.items
        if (taskLists && taskLists.length > 0) {
          for (let i = 0; i < taskLists.length; i++) {
            const taskList = taskLists[i]
            appendPre(`${taskList.title} (${taskList.id})`)
          }
        } else {
          appendPre('No task lists found.')
        }
      })
  }

  return (
    <div>
      <p>Google Tasks API Quickstart</p>

      <button
        ref={authorizeButton}
        id="authorize_button"
        style={{ display: 'none' }}
        onClick={handleAuthClick}
      >
        Authorize
      </button>
      <button
        ref={signoutButton}
        id="signout_button"
        style={{ display: 'none' }}
        onClick={handleSignoutClick}
      >
        Sign Out
      </button>
    </div>
  )
}
