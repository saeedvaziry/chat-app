import { StyleSheet, Dimensions } from 'react-native'
import { Colors } from '@config/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 135,
    height: 135,
    marginBottom: 10
  },
  intro: {
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 10
  }
})

export default styles