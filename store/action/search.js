import {
    SEARCH_BOOK_SUCCESS,
    SEARCH_BOOK_FAIL,
    SEARCH_MORE_BOOK_SUCCESS,
    SEARCH_MORE_BOOK_FAIL
} from "./actionTypes"

const axios = require('axios').default;

export const HandleSearch = (keyword, maxResults) => {
    try {
        return async (dispatch) => {
            console.log(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxResults}&startIndex=0`)
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxResults}&startIndex=0`);
            if (response.status == 200 && response.data.items) {
                dispatch({
                    type: SEARCH_BOOK_SUCCESS,
                    payload: {
                        items: response.data.items,
                        totalItems: response.data.totalItems
                    }
                })
            }
            else {
                dispatch({
                    type: SEARCH_BOOK_FAIL,
                    payload: false
                });
            }
        };
    }
    catch (error) {
        console.log(error)
    }
};

export const searchMoreBooks = (keyword, maxResults, index) => {
    try {
        return async (dispatch) => {
            console.log(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxResults}&startIndex=${index}`
            )
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxResults}&startIndex=${index}`
            )
            if (response.status == 200 && response.data.items && response.data.totalItems > 10) {
                dispatch({
                    type: SEARCH_MORE_BOOK_SUCCESS,
                    payload: response.data.items,
                });
            }
            else {
                dispatch({
                    type: SEARCH_MORE_BOOK_FAIL,
                });
            }

        }
    } catch (error) {
        console.log(error)
    }
};