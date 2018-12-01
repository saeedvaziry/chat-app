import React, { Component } from 'react'
import { Text, Animated, BackHandler, FlatList, View, StatusBar } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { ListItem, Subheader, Toolbar } from 'react-native-material-ui';
import { ActionButton } from 'react-native-material-ui'
import { connect } from 'react-redux'

import { connectSocket, getChats, showChat } from '@actions/ChatAction'

import { GlobalStyles, Colors } from '@config/styles'
import styles from './styles'

class Chats extends Component {
  constructor(props) {
    super(props)
    StatusBar.setBackgroundColor(Colors.PRIMARY)
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillMount = () => {
    this.props.dispatchConnectSocket(this.props.auth.user)
    this.props.dispatchGetChats(this.props.auth.user)
  };


  _handleBackPress = () => {
    BackHandler.exitApp()
    return true
  }

  _keyExtractor = (item, index) => index.toString()

  _getChatName = (chat) => {
    let name = null
    for (let i = 0; i < chat.members.length; i++) {
      if (chat.members[i]._id != this.props.auth.user._id) {
        name = chat.members[i].mobile
      }
    }
    return name
  }

  _getUser = (chat) => {
    let user = null
    for (let i = 0; i < chat.members.length; i++) {
      if (chat.members[i]._id != this.props.auth.user._id) {
        user = chat.members[i]
      }
    }
    return user
  }

  _renderItem = (chat) => {
    return (
      <ListItem
        divider
        leftElement="person"
        numberOfLines="dynamic"
        centerElement={{ primaryText: this._getChatName(chat) }}
        onPress={() => this.props.dispatchShowChat(this.props.auth.user, chat._id)}
      />
    )
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          centerElement="Chats"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <Animated.ScrollView
          contentContainerStyle={[styles.container]}
          ref={ref => this.scrollView = ref}>
          {
            this.props.chat.chats.length > 0 && (
              <FlatList
                data={this.props.chat.chats}
                keyExtractor={this._keyExtractor}
                renderItem={({ item, index }) =>
                  this._renderItem(item)
                }
              />
            )
          }
        </Animated.ScrollView>
        <ActionButton
          icon="add"
          onPress={() => this.props.navigation.navigate('StartChat')}
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
  dispatchConnectSocket: (user) => connectSocket(user),
  dispatchGetChats: (user) => getChats(user),
  dispatchShowChat: (user, chatId) => showChat(user, chatId),
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

export default connect(mapStateToProps, mapDispatchToProps)(Chats)