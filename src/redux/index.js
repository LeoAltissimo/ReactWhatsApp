import { 
    combineReducers,
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import AuthReducer from './auth/authReducer';
import ContactsReducer from './contacts/contactsReducer';
import Conversation from './converation/conversationReducer';
import ConversationList from './conversationList/conversationListReducer';

const reducers = combineReducers({
    AuthReducer,
    ContactsReducer,
    Conversation,
    ConversationList
});

export default createStore( reducers, applyMiddleware(...[thunk, logger]) );
//export default createStore( reducers, applyMiddleware(...[thunk]) );