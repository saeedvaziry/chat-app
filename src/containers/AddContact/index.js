import React, { Component } from 'react'
import { Text, Animated, BackHandler, AsyncStorage, View, ToastAndroid } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { Toolbar } from 'react-native-material-ui';
import { connect } from 'react-redux'

import Button from '@components/FWButton'
import Input from '@components/Input'

import { addContact } from '@actions/ContactAction'

import { GlobalStyles, Colors } from '@config/styles'
import styles from './styles'

class AddContact extends Component {
  constructor(props) {
    super(props)
    this.state = {
      add: {
        first_name: '',
        last_name: '',
        mobile: '+98',
      },
      loader: false
    }
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  _handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  _onChangeFirstName = (key, value) => {
    let add = { ...this.state.add }
    add.first_name = value
    this.setState({ add })
  }

  _onChangeLastName = (key, value) => {
    let add = { ...this.state.add }
    add.last_name = value
    this.setState({ add })
  }

  _onChangeMobile = (key, value) => {
    let add = { ...this.state.add }
    add.mobile = value
    this.setState({ add })
  }

  addContact = () => {
    if (!this.state.add.first_name && !this.state.add.last_name) {
      ToastAndroid.show('FirstName or LastName is required', ToastAndroid.SHORT)
    }
    if (!this.state.add.mobile) {
      ToastAndroid.show('Mobile Number is required', ToastAndroid.SHORT)
    }
    this.props.dispatchAddContact(this.props.auth.user, this.state.add)
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          centerElement="Add Contact"
        />
        <Animated.ScrollView
          contentContainerStyle={GlobalStyles.contentFlexStart}
          ref={ref => this.scrollView = ref}>
          <Input
            placeholder='First Name'
            onChangeText={this._onChangeFirstName}
            value={this.state.add.first_name}
          />
          <Input
            placeholder='Last Name'
            onChangeText={this._onChangeLastName}
            value={this.state.add.last_name}
          />
          <Input
            placeholder='Mobile Number'
            keyboardType='phone-pad'
            onChangeText={this._onChangeMobile}
            value={this.state.add.mobile}
            maxLength={16}
          />
        </Animated.ScrollView>
        <Button
          submitLoader={this.state.loader}
          icon="md-add"
          onPress={() => this.addContact()}
          text="Add Contact"
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchAddContact: (user, contact) => addContact(user, contact)
}

const mapStateToProps = state => ({
  auth: state.auth,
  contact: state.contact,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)