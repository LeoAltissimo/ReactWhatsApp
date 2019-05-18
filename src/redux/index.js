import { 
    combineReducers,
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import AuthReducer from './auth/authReducer';


const reducers = combineReducers({
    AuthReducer
});

export default createStore( reducers, applyMiddleware(...[thunk, logger]) );