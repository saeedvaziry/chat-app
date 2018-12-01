import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator, View } from 'react-native'
import Ripple from 'react-native-material-ripple'

import styles from './styles'

export default ({ onPress, text, loader, type, ...props }) => {
  if (loader) {
    return (
      <View
        style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={true}
          {...props}>
          <ActivityIndicator size="large" color="#ffffff" style={[styles.text, styles.indicator]} />
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <Ripple
        style={styles.container}
        onPress={() => onPress()}>
        <TouchableOpacity
          activeOpacity={0.9}
          {...props}>
          <Text
            style={styles.text}>
            {text}
          </Text>
        </TouchableOpacity>
      </Ripple>
    )
  }
}