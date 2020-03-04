import {
    SEARCH_BOOK,
    SEARCH_MORE_BOOK
} from "./actionTypes"

const axios = require('axios').default;
export const HandleSearch = (keyword) => {
    try {
        return async (dispatch) => {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}`);
            dispatch({
                type: SEARCH_BOOK,
                payload: response.data.items
            })
        };
    }
    catch (error) {
        console.log(error)
    }
};
export const searchMoreBooks = (keyword, amount, index) => {
    try {
        return async (dispatch) => {
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${amount}&startIndex=${index}`
            );
            dispatch({
                type: SEARCH_MORE_BOOK,
                payload: response.data.items
            });
        }
    } catch (error) {
        console.log("can't not fetch books, return 404 error")
    }
};