import {
    LOAD_BOOKS_FROM_SERVER, Mark_BOOK_AS_READ, Mark_BOOK_AS_UNREAD,
    ADD_BOOK, DELETE_BOOK, TOGGLE_IS_LOADING_BOOKS, UPDATE_BOOK_IMAGE, SEARCH_BOOK,
    SEARCH_MORE_BOOK
} from "../action/ActionTypes"
const initialState = {
    books: [],
    booksReading: [],
    booksRead: [],
    isLoadingBooks: true,
    image: null,
    queryItems: []
}

const books = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKS_FROM_SERVER:
            return {
                ...state,
                books: action.payload,
                booksReading: action.payload.filter(book => !book.read),
                booksRead: action.payload.filter(book => book.read)
            };
        case ADD_BOOK:
            return {
                ...state,
                books: [...state.books, action.payload],
                booksReading: [action.payload, ...state.booksReading]
            }
        case DELETE_BOOK:
            return {
                ...state,
                books: state.books.filter(book => book.name !== action.payload.name),
                booksReading: state.booksReading.filter(book => book.name !== action.payload.name),
                booksRead: state.booksRead.filter(book => book.name !== action.payload.name),
            }
        case Mark_BOOK_AS_READ:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.name === action.payload.name) {
                        return { ...book, read: true };
                    }
                    return book
                }),
                booksRead: [...state.booksRead, action.payload],
                booksReading: state.booksReading.filter(book => book.name !== action.payload.name)
            }
        case Mark_BOOK_AS_UNREAD:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.name === action.payload.name) {
                        return { ...book, read: false };
                    }
                    return book
                }),
                booksRead: state.booksRead.filter(book => book.name !== action.payload.name),
                booksReading: [...state.booksReading, action.payload],
            }
        case TOGGLE_IS_LOADING_BOOKS:
            return {
                ...state,
                isLoadingBooks: action.payload
            }
        case UPDATE_BOOK_IMAGE:
            return {
                ...state,
                books: state.books.map(book => {
                    if (book.name == action.payload.name) {
                        return { ...book, image: action.payload.uri }
                    }
                    return book
                }),
                booksReading: state.booksReading.map(book => {
                    if (book.name == action.payload.name) {
                        return { ...book, image: action.payload.uri }
                    }
                    return book
                }),
                booksRead: state.booksRead.map(book => {
                    if (book.name == action.payload.name) {
                        return { ...book, image: action.payload.uri }
                    }
                    return book
                })
            }
        // ----fetch books with Google API----
        case SEARCH_BOOK:
            const fetchedBooks = formatResponseData(action.payload)
            return { ...state, queryItems: fetchedBooks };
        case SEARCH_MORE_BOOK:
            const fetchedMoreBooks = formatResponseData(action.payload)
            return { ...state, queryItems: fetchedMoreBooks };
        default:
            return state;
    }
}
export default books

const formatResponseData = (rawData) => {
    const data = rawData.map(item => {
        if (item.volumeInfo.imageLinks) {
            return {
                name: item.volumeInfo.title,
                image: item.volumeInfo.imageLinks.smallThumbnail,
                read: false
            }
        }
        else {  
            return {
                name: item.volumeInfo.title,
                read: false
            }
        }

    })
    return data
}
