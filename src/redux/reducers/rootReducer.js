import { combineReducers } from 'redux';
import labReducer from './labReducer';

export const rootReducer = combineReducers({
	lab: labReducer,
});
