import React, { Component } from 'react'
import { Animated, View } from 'react-native'
import { connect } from 'react-redux'

import Button from '@components/FWButton'

import { destroyAuthentication } from '@actions/AuthAction'
import { getContacts } from '@actions/ContactAction'

import { GlobalStyles, Colors } from '@config/styles'

class Drawer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    this.props.dispatchGetContacts(this.props.auth.user)
  };
  

  logout = () => {
    // this.props.navigation.navigate('Chats')
    this.props.dispatchDestroyAuthentication()
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Animated.ScrollView contentContainerStyle={GlobalStyles.content} ref={ref => this.scrollView = ref} showsVerticalScrollIndicator={false}>

        </Animated.ScrollView>
        <Button
          loader={false}
          onPress={() => this.logout()}
          text="Logout"
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchDestroyAuthentication: () => destroyAuthentication(),
  dispatchGetContacts: (user) => getContacts(user)
}

const mapStateToProps = state => ({
  auth: state.auth,
  contact: state.contact,
})

export default connect(mapStateToProps, mapDispatchToProps)(Drawer)