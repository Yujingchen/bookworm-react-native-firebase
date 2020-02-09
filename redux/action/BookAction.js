const axios = require('axios').default;

export const loadBooks = books => ({
    type: 'LOAD_BOOKS_FROM_SERVER', payload: books
})

export const markBookAsRead = book => ({
    type: 'Mark_BOOK_AS_READ',
    payload: book,
})

export const markBookAsUnread = book =>
    ({
        type: "Mark_BOOK_AS_UNREAD",
        payload: book
    })

export const addBook = books =>
    ({
        type: 'ADD_BOOK', payload: books
    })
export const deleteBook = book =>
    ({
        type: "DELETE_BOOK", payload: book
    })

export const toogleIsLoadingBooks = bool =>
    ({
        type: "TOGGLE_IS_LOADING_BOOKS", payload: bool
    })

export const updateBookImage = book =>
    ({
        type: "UPDATE_BOOK_IMAGE", payload: book
    })

export const HandleSearch = (keyword) => {
    try {
        return async (dispatch) => {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
            dispatch({
                type: "SEARCH_BOOK",
                payload: response.data.items
            })
        };
    }
    catch (e) {
        console.log(e)
    }
};



