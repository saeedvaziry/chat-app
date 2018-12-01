import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '@config/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  startChatButton: {
    backgroundColor: Colors.PRIMARY
  },
  startChatButtonText: {
    color: Colors.WHITE
  }
})

export default styles