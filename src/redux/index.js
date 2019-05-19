import { 
    combineReducers,
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import AuthReducer from './auth/authReducer';
import ContactsReducer from './contacts/contactsReducer';


const reducers = combineReducers({
    AuthReducer,
    ContactsReducer
});

export default createStore( reducers, applyMiddleware(...[thunk, logger]) );