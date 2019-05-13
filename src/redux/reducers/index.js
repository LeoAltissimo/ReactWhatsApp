import { 
    combineReducers,
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger';
import AuthReducer from '../auth/authReducer';
import ContatosReducer from './ContatosReducer';


const reducers = combineReducers({
    AuthReducer,
    ContatosReducer
});

export default createStore( reducers, applyMiddleware(...[thunk, logger]) );