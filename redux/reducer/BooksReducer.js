const initialState = {
    books: [],
    booksReading: [],
    booksRead: [],
    isLoadingBooks: true
}

const books = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_BOOKS_FROM_SERVER':
            return {
                ...state,
                books: action.payload,
                booksReading: action.payload.filter(book => !book.read),
                booksRead: action.payload.filter(book => book.read)
            };
        case 'ADD_BOOK':
            console.log("addbook")
            return {
                ...state,
                books: [...state.books, action.payload],
                booksReading: [action.payload, ...state.booksReading]
            }
        case "Mark_BOOK_AS_READ":
            console.log("mark read")
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
        case "TOGGLE_IS_LOADING_BOOKS":
            console.log("isloading")
            return {
                ...state,
                isLoadingBooks: action.payload
            }
        default:
            return state;
    }
}
export default books
