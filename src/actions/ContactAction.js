import { NavigationActions } from 'react-navigation'
import { ToastAndroid, AsyncStorage } from 'react-native'

import CONFIGS from '@config/app'

import {
  ADD_CONTACT,
  ADD_CONTACT_SUCCESS,
  ADD_CONTACT_FAILURE,
} from '@reducers/ContactReducer'

function add() {
  return {
    type: ADD_CONTACT
  }
}

function addSuccess(contacts) {
  return {
    type: ADD_CONTACT_SUCCESS,
    contacts: contacts
  }
}

function addFailure(error) {
  ToastAndroid.show(error, ToastAndroid.SHORT)
  return {
    type: ADD_CONTACT_FAILURE,
  }
}

export function addContact(user, contact) {
  return (dispatch) => {
    dispatch(add())
    fetch(CONFIGS.BASE_URL + '/api/contacts/import', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      },
      body: JSON.stringify({
        contacts: [contact]
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          ToastAndroid.show(data.message, ToastAndroid.SHORT)
          dispatch(NavigationActions.navigate({ routeName: 'StartChat' }))
          // AsyncStorage.setItem('contacts', JSON.stringify(data.contacts), (error) => {
          //   if (error) {
          //     dispatch(addFailure(error))
          //   } else {
          //     dispatch(addSuccess(data.contacts))
          //     dispatch(NavigationActions.navigate({ routeName: 'StartChat' }))
          //   }
          // })
        })
      } else {
        response.json().then((data) => {
          dispatch(addFailure(data.message))
        })
      }
    }).catch((error) => {
      dispatch(addFailure(error))
    })
  }
}

export function getContacts(user) {
  return (dispatch) => {
    fetch(CONFIGS.BASE_URL + '/api/contacts/get', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          AsyncStorage.setItem('contacts', JSON.stringify(data.contacts))
        })
      }
    })
  }
}