import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import { Colors } from '@config/styles'

import Chats from '@containers/Chats'
import Chat from '@containers/Chat'
import StartChat from '@containers/StartChat'
import AddContact from '@containers/AddContact'

const routes = {
  Chats: {
    screen: Chats
  },
  Chat: {
    screen: Chat
  },
  StartChat: {
    screen: StartChat
  },
  AddContact: {
    screen: AddContact
  },
}

const options = {
  initialRouteName: 'Chats',
  navigationOptions: {
    header: null
  },
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
      useNativeDriver: true
    },
  })
}

export default createStackNavigator(routes, options)