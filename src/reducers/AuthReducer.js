export const AUTH = 'AUTH'
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

export const AUTH_CONFIRM = 'AUTH_CONFIRM'
export const AUTH_CONFIRM_SUCCESS = 'AUTH_CONFIRM_SUCCESS'
export const AUTH_CONFIRM_FAILURE = 'AUTH_CONFIRM_FAILURE'

export const AUTH_DESTROY = 'AUTH_DESTROY'

const initialState = {
  mobile: null,
  user: {},
  authError: false,
  authErrorMessage: '',
  loader: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        loader: true
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        mobile: action.mobile,
        loader: false
      }
    case AUTH_FAILURE:
      return {
        ...state,
        authError: true,
        authErrorMessage: action.error.message,
        loader: false
      }
    case AUTH_CONFIRM:
      return {
        ...state,
        mobile: action.mobile,
        loader: true,
        authError: false
      }
    case AUTH_CONFIRM_SUCCESS:
      return {
        ...state,
        loader: false,
        user: action.user
      }
    case AUTH_CONFIRM_FAILURE:
      return {
        ...state,
        mobile: action.mobile,
        loader: false,
        authError: true,
        authErrorMessage: action.error.message
      }
    case AUTH_DESTROY:
      return {
        ...initialState
      }
    default:
      return state
  }
}