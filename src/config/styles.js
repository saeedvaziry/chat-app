import { StyleSheet, Dimensions } from 'react-native'

export const Colors = {
  WHITE: '#FFFFFF',
  PRIMARY: '#0085FF',
  PRIMARY_DARK: '#0060b5',
  SECONDARY: '#b9b9b9',
  GRAY: '#F1EEFC',
  DARK_GRAY: '#d8d5e2',
  BLACK: '#131313',
  LIGHT_BLACK: '#333333'
}

export const GlobalStyles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerCenter: {
    backgroundColor: Colors.WHITE,
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
  content: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentFlexStart: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.WHITE,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  box: {
    backgroundColor: Colors.WHITE,
    padding: 30,
    margin: 30,
    borderRadius: 5,
  },
  input: {
    fontFamily: 'Samim',
    borderWidth: 1,
    alignSelf: 'stretch',
    margin: 20,
    borderColor: Colors.DARK_GRAY,
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 8
  },
  inputCenter: {
    width: Dimensions.get('window').width,
    textAlign: 'center'
  },
  text: {
    width: Dimensions.get('window').width,
    margin: 20,
    marginBottom: 10
  },
  header: {
    height: 56,
    backgroundColor: Colors.PRIMARY,
    elevation: 4,
  },
  headerTitle: {
    color: Colors.WHITE,
    fontFamily: 'Samim',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: '500'
  },
  navigatorLabel: {
    fontFamily: 'Samim',
    textAlign: 'center',
    justifyContent: 'center'
  },
  indicator: {
    width: Dimensions.get('window').width,
    padding: 9,
  }
})