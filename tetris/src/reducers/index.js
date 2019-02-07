/**
 * Combine all of the reducers into one.
 */

import { combineReducers } from 'redux';
import Main from './main';

const rootReducer = combineReducers({
	Main
});


export default rootReducer;