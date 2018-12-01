import { StyleSheet, Dimensions } from 'react-native'
import { GlobalStyles, Colors } from '@config/styles'

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
  name: {
    color: Colors.WHITE,
    fontSize: 35,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  indicatorContainer: {
    width: Dimensions.get('window').width - 20,
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 10,
  },
  indicator: {
    width: Dimensions.get('window').width - 20,
    padding: 9,
  }
});

export default styles;