/* ========================================================================== */
/* Import                                                                     */
/* ========================================================================== */
import { combineReducers, createStore, applyMiddleware } from 'redux';
import AuthReducer from './auth/stores/reducer';
import ShogibanReducer from './shogiban/stores/reducer';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    shogiban: ShogibanReducer,
    auth: AuthReducer,
})

export default createStore(reducer, applyMiddleware(thunk));