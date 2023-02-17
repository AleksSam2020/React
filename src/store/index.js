import { applyMiddleware, combineReducers, createStore } from 'redux';
import { userReducer } from './user/reducer';
import { coursesReducer } from './courses/reducer';
import { authorsReducer } from './authors/reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export default store;
