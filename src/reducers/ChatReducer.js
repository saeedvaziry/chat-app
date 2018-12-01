export const CONNECTION = 'CONNECTION'
export const CONNECTION_SUCCESS = 'CONNECTION_SUCCESS'
export const CONNECTION_FAILURE = 'CONNECTION_FAILURE'

export const CHATS = 'CHATS'
export const SHOW_CHAT = 'SHOW_CHAT'

export const NEW_MESSAGE = 'NEW_MESSAGE'

const initialState = {
  socket: {},
  connected: false,
  connectionError: false,
  connectionErrorMessage: '',
  user: {},
  message: {},
  chats: [],
  chat: {},
  messages: [],
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
        message: action.message
      }
    case CHATS:
      return {
        ...state,
        chats: action.chats
      }
    case SHOW_CHAT:
      return {
        ...state,
        user: action.user,
        chat: action.chat,
        messages: action.messages
      }
    default:
      return state
  }
}