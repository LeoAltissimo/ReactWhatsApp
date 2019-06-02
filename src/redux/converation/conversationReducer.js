const initialState = {
  recipientUid: null,
  chatInfo: {
    recipientUid: null,
    recipientName: null,
    lastMensage: {},
    chatKey: null
  },
  chat: [],
  conversationLoading: false,
  conversationError: false,
  newConversation: false
}

export default function reducer(State = initialState, action) {
  switch (action.type) {
    case "CONVERSATION_NEW_RECIPIENT":
      return {
        ...State,
        recipientUid: action.payload
      }

    case "CONVERSATION_GET_INFO_LOADING":
      return {
        ...State,
        conversationLoading: true
      }

    case "CONVERSATION_GET_INFO_SUCCESS":
      return {
        ...State,
        conversationLoading: false,
        chatInfo: action.payload,
        newConversation: true
      }

    case "CONVERSATION_GET_INFO_EMPTY":
      return {
        ...State,
        conversationLoading: false,
        chatInfo: initialState.chatInfo,
        newConversation: true
      }

    case "CONVERSATION_GET_INFO_ERROR":
      return {
        ...State,
        conversationLoading: false
      }

    case "CONVERSATION_GET_CHAT":
      return {
        ...State,
        chat: action.payload
      }

    case "CONVERSATION_GET_CHAT_ERROR":
      return {
        ...State,
        chat: []
      }

    case "CONVERSATION_SET_NEW_SUCCESS":
      return {
        ...State,
        chatInfo: action.payload
      }

    case "CONVERSATION_SET_NEW_ERROR":
      return {
        ...State,
        chatInfo: initialState.chatInfo
      }

    default:
      return State
  }
}