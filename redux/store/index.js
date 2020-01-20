import { createStore, combineReducers } from "redux"

import booksReducer from "../reducer/BooksReducer"
const store = createStore(
    combineReducers({
        books: booksReducer
    })
);

export default store