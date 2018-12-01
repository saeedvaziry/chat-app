import { StyleSheet, Dimensions } from 'react-native'

import { Colors } from '@config/styles'

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    backgroundColor: Colors.PRIMARY,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: Colors.PRIMARY,
  },
  text: {
    fontFamily: 'Samim',
    padding: 15,
    textAlign: 'center',
    fontSize: 15,
    color: Colors.WHITE,
    width: Dimensions.get('window').width,
    fontSize: 15
  },
  indicator: {
    padding: 9,
  }
});

export default styles