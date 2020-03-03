import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from 'redux-thunk';
import booksReducer from "./reducer/BooksReducer"
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers({
        books: booksReducer
    }), composeEnhancers(applyMiddleware(...middleware))
);

export default store


