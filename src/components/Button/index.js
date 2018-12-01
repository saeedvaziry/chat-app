import React from 'react'
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import Ripple from 'react-native-material-ripple'

import styles from './styles'

export default ({ style, textStyle, onPress, text, loader, ...props }) => {
  if (loader) {
    return (
      <Ripple
        onPress={() => onPress()}>
        <TouchableOpacity
          onPress={() => onPress()}
          style={[styles.container, style]}
          activeOpacity={0.9}
          disabled={true}
          {...props}>
          <ActivityIndicator size="large" color="#ffffff" style={[styles.indicator, textStyle]} />
        </TouchableOpacity>
      </Ripple>
    )
  } else {
    return (
      <Ripple
        onPress={() => onPress()}>
        <TouchableOpacity
          style={[styles.container, style]}
          activeOpacity={0.9}
          {...props}>
          <Text
            style={[styles.text, textStyle]}>
            {text}
          </Text>
        </TouchableOpacity>
      </Ripple>
    )
  }
}