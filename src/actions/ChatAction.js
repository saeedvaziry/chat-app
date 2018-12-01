import { NavigationActions } from 'react-navigation'
import { ToastAndroid, AsyncStorage } from 'react-native'
import SocketIOClient from 'socket.io-client'

import CONFIGS from '@config/app'

import {
  CONNECTION,
  CONNECTION_SUCCESS,
  CONNECTION_FAILURE,
  CHATS,
  SHOW_CHAT,
  NEW_MESSAGE,
} from '@reducers/ChatReducer'

function connection() {
  return {
    type: CONNECTION
  }
}

function connectionSuccess(socket) {
  ToastAndroid.show('connected', ToastAndroid.SHORT)
  return {
    type: CONNECTION_SUCCESS,
    socket: socket,
    isConnecting: false,
  }
}

function connectionFailure(error) {
  ToastAndroid.show(error, ToastAndroid.SHORT)
  return {
    type: CONNECTION_FAILURE,
    error: error
  }
}

function newMessage(message) {
  return {
    type: NEW_MESSAGE,
    message: message
  }
}

export function connectSocket(user) {
  return (dispatch) => {
    dispatch(connection())
    let socket = SocketIOClient(CONFIGS.BASE_URL + '?token=' + user.token)

    socket.on('connected', () => {
      dispatch(connectionSuccess(socket))
    })

    socket.on('newMessage', (data) => {
      dispatch(newMessage(data.message))
    })

    socket.on('error', function (err) {
      dispatch(connectionFailure(err))
    })
  }
}

function chats(chats) {
  return {
    type: CHATS,
    chats: chats
  }
}

export function getChats(user) {
  return (dispatch) => {
    fetch(CONFIGS.BASE_URL + '/api/chats/get', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          dispatch(chats(data.chats))
          AsyncStorage.setItem('chats', JSON.stringify(data.chats))
        })
      }
    })
  }
}

export function showChat(user, chatId) {
  return (dispatch) => {
    fetch(CONFIGS.BASE_URL + '/api/chats/messages', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({
        chat_id: chatId
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          dispatch({
            type: SHOW_CHAT,
            user: data.user,
            chat: data.chat,
            messages: data.messages
          })
          dispatch(NavigationActions.navigate({ routeName: 'Chat' }))
        })
      }
    })
  }
}