export const ADD_CONTACT = 'ADD_CONTACT'
export const ADD_CONTACT_SUCCESS = 'ADD_CONTACT_SUCCESS'
export const ADD_CONTACT_FAILURE = 'ADD_CONTACT_FAILURE'

const initialState = {
  contacts: [],
  loader: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        loader: true
      }
    case ADD_CONTACT_SUCCESS:
      return {
        ...state,
        contacts: action.contacts,
        loader: false
      }
    case ADD_CONTACT_FAILURE:
      return {
        ...state,
        loader: false
      }
    default:
      return state
  }
}