import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk';
import booksReducer from "../reducer/BooksReducer"

const store = createStore(
    combineReducers({
        books: booksReducer
    }), applyMiddleware(thunk)
);

export default store