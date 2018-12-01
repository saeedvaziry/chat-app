import { ToastAndroid, AsyncStorage } from 'react-native'
import SocketIOClient from 'socket.io-client'

import CONFIGS from '@config/app'

import {
  CONNECTION,
  CONNECTION_SUCCESS,
  CONNECTION_FAILURE,
  NEW_MESSAGE,
} from '@reducers/SocketReducer'

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