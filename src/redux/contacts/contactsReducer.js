const initialState = {
  newContactEmail: '',
  contactList: [],
  addContactLoading: false,
  addContactError: null
}

export default function reducer(State = initialState, action) {
  switch (action.type) {
    case "CONTACTS_SET_EMAIL_TO_ADD":
      return {
        ...State,
        newContactEmail: action.payload
      }

    case "CONTACTS_SET_ERROR":
      return {
        ...State,
        addContactError: action.payload
      }

    case "CONTACTS_ADD_NEW_LOADING":
      return {
        ...State,
        addContactLoading: true,
        addContactError: null
      }

    case "CONTACTS_ADD_NEW_SUCCESS":
      return {
        ...State,
        addContactLoading: false,
        addContactError: null
      }

    case "CONTACTS_ADD_NEW_ERROR":
      return {
        ...State,
        addContactLoading: false,
        addContactError: action.payload
      }

    case "CONTACTS_GET_LIST_SUCCESS":        
      return {
        ...State,
        contactList: action.payload
      }

    default:
      return State
  }
}