import React, { Component } from 'react'
import { BackHandler, View } from 'react-native'
import { DrawerActions } from 'react-navigation'
import { Toolbar } from 'react-native-material-ui'
import { connect } from 'react-redux'

import { GiftedChat, InputToolbar } from '@components/Chat'

import styles from './styles'

class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    this.props.chat.socket.emit('sendMessage', {
      user_id: messages[0].user._id,
      text: messages[0].text
    })
  }

  componentDidMount = () => {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackPress)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, {
        _id: nextProps.chat.message._id,
        text: nextProps.chat.message.text,
        createdAt: new Date(),
        user: {
          _id: nextProps.chat.message.user._id,
          name: nextProps.chat.message.user.name,
          avatar: nextProps.chat.message.user.avatar,
        },
      }),
    }))
  }

  _handleBackPress = () => {
    this.props.navigation.goBack(0)
    return true
  }

  renderInputToolbar(props) {
    return <InputToolbar {...props} placeholder="Type here..." />
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          leftElement="menu"
          onLeftElementPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
          centerElement="Chats"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
          }}
        />
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          renderInputToolbar={this.renderInputToolbar}
          user={this.props.auth.user}
        />
      </View>
    )
  }
}

const mapDispatchToProps = {
}

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
})

export default connect(mapStateToProps, mapDispatchToProps)(Messages)