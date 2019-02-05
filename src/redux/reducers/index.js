import { 
    combineReducers,
    createStore, 
    applyMiddleware 
} from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from './AuthReducer';
import ContatosReducer from './ContatosReducer';


const reducers = combineReducers({
    AuthReducer,
    ContatosReducer
});

export default createStore( reducers, applyMiddleware(thunk) );