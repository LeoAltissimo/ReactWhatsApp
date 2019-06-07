const initialState = {
  conversationList: [],
  conversationListLoading: false,
  conversationListError: null
}

export default function reducer(State = initialState, action) {
  switch (action.type) {

    case "CONVERSATION_LIST_LOADING":
      return {
        ...State,
        conversationListLoading: true,
        conversationListError: null
      }

    case "CONVERSATION_LIST_SUCCESS":        
      return {
        ...State,
        conversationList: action.payload,
        conversationListLoading: true,
        conversationListError: null
      }

    case "CONVERSATION_LIST_ERROR":
      return {
        ...State,
        conversationList: initialState.conversationList,
        conversationListLoading: false,
        conversationListError: action.payload
      }

    default:
      return State
  }
}