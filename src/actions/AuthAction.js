import { NavigationActions } from 'react-navigation'
import { ToastAndroid, AsyncStorage } from 'react-native'

import CONFIGS from '@config/app'

import {
  AUTH,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_CONFIRM,
  AUTH_CONFIRM_SUCCESS,
  AUTH_CONFIRM_FAILURE,
  AUTH_DESTROY
} from '@reducers/AuthReducer'

function auth() {
  return {
    type: AUTH
  }
}

function authSuccess(mobile) {
  return {
    type: AUTH_SUCCESS,
    mobile: mobile
  }
}

function authFailure(error) {
  ToastAndroid.show(error, ToastAndroid.SHORT)
  return {
    type: AUTH_FAILURE,
    error: error
  }
}

export function authenticate(mobile) {
  return (dispatch) => {
    dispatch(auth())
    fetch(CONFIGS.BASE_URL + '/api/authenticate', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: mobile
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          ToastAndroid.show(data.message, ToastAndroid.SHORT)
          dispatch(authSuccess(mobile))
          dispatch(NavigationActions.navigate({ routeName: 'AuthConfirm' }))
        })
      } else {
        response.json().then((data) => {
          dispatch(authFailure(data.message))
        })
      }
    }).catch((error) => {
      dispatch(authFailure(error))
    })
  }
}

export function checkAuthentication(user) {
  return (dispatch) => {
    fetch(CONFIGS.BASE_URL + '/api/authenticate/user', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token,
      }
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          AsyncStorage.setItem('user', JSON.stringify(data.user), (error) => {
            if (!error) {
              dispatch(authConfirmSuccess(data.user))
              dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
            } else {
              AsyncStorage.removeItem('user')
              dispatch(authFailure(data.message))    
            }
          })
        })
      } else if (response.status == 401) {
        response.json().then((data) => {
          AsyncStorage.removeItem('user')
          dispatch(showAuthentication())
        })
      } else {
        response.json().then((data) => {
          dispatch(authFailure(data.message))
        })
      }
    }).catch((error) => {
      dispatch(authFailure(error))
    })
  }
}

export function showAuthentication() {
  return (dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'Auth' }))
  }
}

function authConfirm() {
  return {
    type: AUTH_CONFIRM
  }
}

function authConfirmSuccess(user) {
  return {
    type: AUTH_CONFIRM_SUCCESS,
    user: user
  }
}

function authConfirmFailure(error) {
  ToastAndroid.show(error, ToastAndroid.SHORT)
  return {
    type: AUTH_CONFIRM_FAILURE,
    error: error
  }
}

export function confirmAuthentication(mobile, code) {
  return (dispatch) => {
    dispatch(authConfirm())
    fetch(CONFIGS.BASE_URL + '/api/authenticate/confirm', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mobile: mobile,
        otp_code: code
      })
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          AsyncStorage.setItem('user', JSON.stringify(data.user), (error) => {
            if (!error) {
              dispatch(authConfirmSuccess(data.user))
              dispatch(NavigationActions.navigate({ routeName: 'Drawer' }))
            }
          })
        })
      } else {
        response.json().then((data) => {
          dispatch(authConfirmFailure(data.message))
        })
      }
    }).catch((error) => {
      dispatch(authConfirmFailure(error))
    })
  }
}

function destroy() {
  return {
    type: AUTH_DESTROY
  }
}

export function destroyAuthentication() {
  return (dispatch) => {
    dispatch(destroy())
    AsyncStorage.removeItem('user')
    dispatch(showAuthentication())
  }
}