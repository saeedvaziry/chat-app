import { StyleSheet, Dimensions } from 'react-native';

import { Colors } from '@config/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width
  },
  content: {
    justifyContent: 'flex-start',
    paddingTop: 10,
    paddingBottom: 10
  },
  card: {
    width: Dimensions.get('window').width - 20,
    margin: 10,
    height: 120,
    borderColor: Colors.GRAY,
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
    backgroundColor: Colors.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noCard: {
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Samim',
    flexDirection: 'column'
  },

});

export default styles;