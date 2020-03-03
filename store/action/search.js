const axios = require('axios').default;
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
    catch (error) {
        console.log(error)
    }
};
export const searchMoreBooks = (keyword, totalItems) => {
    try {
        return async (dispatch) => {
            console.log(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${totalItems}`)
            const response = await axios.get(
                `https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${totalItems}`
            );
            dispatch({
                type: "SEARCH_MORE_BOOK",
                payload: response.data.items
            });
        }
    } catch (error) {
        console.log(error)
    }
};