import React, { Component } from 'react'
import { Text, Animated, BackHandler, AsyncStorage, View, FlatList } from 'react-native'
import { DrawerActions } from 'react-navigation'
import Contacts from 'react-native-contacts'
import { ListItem, Subheader, Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'

import { GlobalStyles, Colors } from '@config/styles'
import styles from './styles'

class StartChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contacts: []
    }
    // Contacts.checkPermission((err, permission) => {
    //   if (err) throw err;
    //   if (permission === 'undefined') {
    //     Contacts.requestPermission()
    //   }
    //   if (permission === 'authorized') {
    //     Contacts.getAll((err, contacts) => {
    //       if (err) throw err;
    //       this.setState({ contacts })
    //     })
    //   }
    //   if (permission === 'denied') {
    //     alert('We dont have permission to read your contacts')
    //   }
    // })
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
    AsyncStorage.getItem('contacts', (err, contacts) => {
      if (!err) {
        this.setState({
          contacts: JSON.parse(contacts)
        })
      }
    })
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  _handleBackPress = () => {
    this.props.navigation.goBack()
    return true
  }

  _keyExtractor = (item, index) => index.toString()

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          centerElement="New Chat"
          rightElement="add"
          onRightElementPress={() => this.props.navigation.navigate('AddContact')}
        />
        <Animated.ScrollView
          contentContainerStyle={[styles.container]}
          ref={ref => this.scrollView = ref}>
          {
            this.state.contacts.length > 0 && (
              <FlatList
                data={this.state.contacts}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) =>
                  <ListItem
                    divider
                    leftElement="person"
                    numberOfLines="dynamic"
                    centerElement={{
                      primaryText: item.name.first_name + ' ' + item.name.last_name,
                    }}
                    onPress={() => this.props.navigation.navigate('Messages', {user: item.user})}
                  />
                }
              />
            )
          }
        </Animated.ScrollView>
      </View>
    )
  }
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(StartChat)