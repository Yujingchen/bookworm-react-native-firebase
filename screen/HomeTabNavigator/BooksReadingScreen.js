import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { connect } from "react-redux"
import ListEmptyComponent from "../../components/common/listEmptyComponent/ListEmptyComponent"
import { snapshotToArray } from "../../helper/firebaseHelpers"
import "firebase/storage"
import * as firebase from "firebase/app"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import {
    loadBooks, addBook, deleteBook, toogleIsLoadingBooks
} from "../../store/action/book"

import Layout from "../../components/layout/Layout"

class BooksReadingScreen extends Component {
    constructor() {
        super()
        this.state = {
            value: "",
            books: [],
            currentUser: {}
        }
        this.textInputRef = null
        this.userId = firebase.auth().currentUser.uid
    }
    componentDidMount = async () => {
        const user = await firebase.auth().currentUser
        const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
        const books = await firebase.database().ref('books').child(user.uid).once('value')
        const booksArray = snapshotToArray(books)
        this.setState({
            currentUser: currentUserData.val(),
        })
        this.props.loadBooks(booksArray.reverse())
        this.props.toogleIsLoadingBooks(false)
    }

    // deleteBook = async (selectedBook, index) => {
    //     this.props.toogleIsLoadingBooks(true)
    //     await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).remove()
    //     this.props.deleteBook(selectedBook)
    //     this.props.toogleIsLoadingBooks(false)
    // }
    // catch(error) {
    //     console.log(error)
    //     this.props.toogleIsLoadingBooks(false)
    // }


    render() {
        return (
            <View>
                <Layout></Layout>
            </View>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = dispatch => ({
    loadBooks: (books) => {
        dispatch(loadBooks(books))
    },
    addBook: (books) => {
        dispatch(addBook(books))
    },
    deleteBook: (book) => {
        dispatch(deleteBook(book))
    },
    toogleIsLoadingBooks: (bool) => {
        dispatch(toogleIsLoadingBooks(bool))
    },
})

const wrapper = compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectActionSheet
)
export default wrapper(BooksReadingScreen);