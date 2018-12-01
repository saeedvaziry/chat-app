import { createDrawerNavigator } from 'react-navigation'

import { Colors } from '@config/styles'

import HomeNavigator from './HomeNavigator'
import Drawer from '@components/Drawer'

const routes = {
  HomeNavigator: {
    screen: HomeNavigator
  }
}

const options = {
  drawerBackgroundColor: Colors.WHITE,
  contentComponent: Drawer
}

export default createDrawerNavigator(routes, options)
