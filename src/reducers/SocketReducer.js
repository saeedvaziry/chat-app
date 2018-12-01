export const CONNECTION = 'CONNECTION'
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS'
export const CONNECTION_FAILURE = 'CONNECTION_FAILURE'

export const NEW_MESSAGE = 'NEW_MESSAGE'

const initialState = {
  socket: {},
  connected: false,
  connectionError: false,
  connectionErrorMessage: '',
  message: '',
  isConnecting: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CONNECTION:
      return {
        ...state,
        connected: false,
        isConnecting: true,
        authError: false
      }
    case CONNECTION_SUCCESS:
      return {
        ...state,
        connected: true,
        socket: action.socket,
        isConnecting: false,
      }
    case CONNECTION_FAILURE:
      return {
        ...state,
        connected: false,
        isConnecting: false,
        connectionError: true,
        connectionErrorMessage: action.error.message
      }
    case NEW_MESSAGE:
      return {
        ...state,
        connected: true,
        isConnecting: false,
        message: action.message
      }
    default:
      return state
  }
}