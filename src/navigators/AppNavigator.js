import React from 'react'
import { Animated, Easing } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import { Colors } from '@config/styles'

import Splash from '@containers/Splash'
import Auth from '@containers/Auth'
import AuthConfirm from '@containers/AuthConfirm'
import Drawer from './DrawerNavigator'

const routes = {
  Splash: {
    screen: Splash,
    navigationOptions: {
      header: null,
    }
  },
  Auth: {
    screen: Auth,
    navigationOptions: {
      header: null,
    }
  },
  AuthConfirm: {
    screen: AuthConfirm,
    navigationOptions: {
      header: null,
    }
  },
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      header: null,
    }
  }
}

const options = {
  initialRouteName: 'Splash',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
      useNativeDriver: true
    },
  })
}

export const AppNavigator = createStackNavigator(routes, options)

createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)

const App = reduxifyNavigator(AppNavigator, "root")

const mapStateToProps = (state) => ({
  state: state.nav,
})

export default connect(mapStateToProps)(App)
