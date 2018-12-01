import React, { Component } from 'react'
import { Text, Animated, BackHandler, Keyboard, View, StatusBar, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'

import { confirmAuthentication } from '@actions/AuthAction'

import Button from '@components/FWButton'
import Input from '@components/Input'

import { GlobalStyles, Colors } from '@config/styles'
import styles from './styles'

class AuthConfirm extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      mobile: props.auth.mobile,
      code: '1234'
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

  confirmAuthentication = () => {
    if (!this.state.code) {
      ToastAndroid.show('Code cannot be blank', ToastAndroid.SHORT)
      return
    }
    if (this.state.code.length != 4) {
      ToastAndroid.show('Invalid code', ToastAndroid.SHORT)
      return
    }
    this.props.dispatchConfirmAuthentication(this.state.mobile, this.state.code)
  }

  _keyboardDidShow = () => {
    StatusBar.setBackgroundColor(Colors.WHITE, true)
  }

  _keyboardDidHide = () => {
    StatusBar.setBackgroundColor(Colors.PRIMARY, true)
  }

  _onChangeCode = (key, value) => {
    this.setState({
      code: value
    })
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Animated.ScrollView contentContainerStyle={GlobalStyles.content} ref={ref => this.scrollView = ref} showsVerticalScrollIndicator={false}>
          <Text>
            Enter 4 digits code that sent to your mobile
          </Text>
          <Input
            keyboardType='numeric'
            placeholder='1234'
            maxLength={4}
            onChangeText={this._onChangeCode}
            value={this.state.code}
          />
        </Animated.ScrollView>
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          loader={this.props.auth.loader}
          onPress={this.confirmAuthentication}
          text="Done"
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchConfirmAuthentication: (mobile, code) => confirmAuthentication(mobile, code)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthConfirm)