import React, { Component } from 'react'
import { AsyncStorage, Animated, StatusBar } from 'react-native'
import { connect } from 'react-redux'

import { showAuthentication, checkAuthentication } from '@actions/AuthAction'

import { GlobalStyles, Colors } from '@config/styles'

import logo from '@assets/logo.png'

class Splash extends Component {
  constructor(props) {
    super(props)
    StatusBar.setBackgroundColor(Colors.WHITE)
    AsyncStorage.getItem('user', (err, result) => {
      if (!err) {
        if (result) {
          this.props.dispatchCheckAuthentication(JSON.parse(result))
        } else {
          this.props.dispatchShowAuthentication()
        }
      } else {
        this.props.dispatchShowAuthentication()
      }
    })
  }

  render() {
    return (
      <Animated.ScrollView contentContainerStyle={GlobalStyles.containerCenter} ref={ref => this.scrollView = ref} showsVerticalScrollIndicator={false}>
        <Animated.Image source={logo} style={GlobalStyles.logo} />
      </Animated.ScrollView>
    )
  }
}

const mapDispatchToProps = {
  dispatchShowAuthentication: () => showAuthentication(),
  dispatchCheckAuthentication: (user) => checkAuthentication(user),
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)