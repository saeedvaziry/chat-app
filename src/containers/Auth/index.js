import React, { Component } from 'react'
import { Text, Animated, BackHandler, Keyboard, View, StatusBar, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import { authenticate } from '@actions/AuthAction'

import Button from '@components/FWButton'
import Input from '@components/Input'

import { GlobalStyles, Colors } from '@config/styles'
import styles from './styles'

class Auth extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      mobile: '+98'
    }
  }

  componentWillMount = () => {
    StatusBar.setBackgroundColor(Colors.PRIMARY, true)
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp()
      return true
    })
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
    Keyboard.removeListener('keyboardDidShow', this._keyboardDidShow)
    Keyboard.removeListener('keyboardDidHide', this._keyboardDidHide)
  }

  authenticate = () => {
    if (!this.state.mobile) {
      ToastAndroid.show('Mobile cannot be blank', ToastAndroid.SHORT)
      return
    }
    const { mobile } = this.state
    this.props.dispatchAuthenticate(mobile)
  }

  _keyboardDidShow = () => {
    StatusBar.setBackgroundColor(Colors.WHITE, true)
  }

  _keyboardDidHide = () => {
    StatusBar.setBackgroundColor(Colors.PRIMARY, true)
  }

  _onChangeMobile = (key, value) => {
    this.setState({
      mobile: value
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.ScrollView contentContainerStyle={GlobalStyles.content} ref={ref => this.scrollView = ref} showsVerticalScrollIndicator={false}>
          <Text>
            Enter your mobile number
          </Text>
          <Input
            keyboardType='phone-pad'
            onChangeText={this._onChangeMobile}
            value={this.state.mobile}
          />
        </Animated.ScrollView>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          loader={this.props.auth.loader}
          onPress={this.authenticate}
          text="Send authentication code"
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (mobile) => authenticate(mobile)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)