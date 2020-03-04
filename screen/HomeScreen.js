import React from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';
import SearchBar from "../components/SearchBar/SearchBar"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import { snapshotToArray } from "../helper/firebaseHelpers"
import { connect } from "react-redux"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import {
    loadBooks, addBook,
    toogleIsLoadingBooks,
} from "../store/action/book"
import { HandleSearch, searchMoreBooks } from "../store/action/search"
import styles from '../styles/Stylesheet'
import "firebase/storage"
import Footer from "../components/footer/Footer"
import BookList from "../components/book/BookList"
import ListEmptyComponent from "../components/common/listEmptyComponent/ListEmptyComponent"
class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            value: "",
            query: "",
            result: [],
            amounts: 10,
            loading: true,
            loadingMore: false,
            refreshing: false,
            currentUser: {}
        }
        this.userId = firebase.auth().currentUser.uid
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }

    componentDidMount = async () => {
        const user = this.props.navigation.getParam('user')
        const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
        const books = await firebase.database().ref('books').child(user.uid).once('value')
        const booksArray = snapshotToArray(books)
        this.setState({
            currentUser: currentUserData.val(),
        })
        this.props.loadBooks(booksArray.reverse())
        this.props.toogleIsLoadingBooks(false)
    }
    handleOnChange = (text) => {
        this.setState({
            value: text
        })
    }
    handleSearch = async (bookName) => {
        this.setState({ query: bookName })
        this.props.searchBook(bookName)
    }
    handleScroll = async (query) => {
        const { amounts } = this.state
        try {
            this.setState(
                (prevState, nextProps) => {
                    return ({ amounts: prevState.amounts + 10, loadingMore: true })
                },
                () => {
                    if (amounts < 40) {
                        this.props.searchMoreBooks(query, amounts)
                    }
                    else if (amounts == 40) {
                        this.props.searchMoreBooks(query, amounts)
                        this.setState({
                            loadingMore: false
                        })
                    }
                }
            );
        }
        catch (error) {
            this.setState({
                loadingMore: false
            })
        }
    }

    handleSave = async (item) => {
        try {
            const snapshot = await firebase.database().ref('books').child(this.state.currentUser.uid).orderByChild('bookid').equalTo(item.id).once("value")
            if (snapshot.exists()) {
                alert("Same book already exist in library")
            }
            else {
                const key = await firebase.database().ref('books').child(this.state.currentUser.uid).push().key
                const response = await firebase.database().ref('books').child(this.state.currentUser.uid).child(key).set({ bookid: item.id, name: item.name, read: false, image: item.image })
                this.props.addBook({ bookid: item.id, name: item.name, read: false, key: key, image: item.image })
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    handleRefresh = (query) => {
        if (query) {
            this.setState({ amounts: 10, refreshing: true },
                () => {
                    this.props.searchBook(query)
                    this.setState({ refreshing: false })
                }
            );
        }
    };

    render() {
        const { value, query } = this.state
        return (
            <View style={styles.container} >
                <SafeAreaView style={{ backgroundColor: 'red' }} />
                <View style={styles.container} >
                    <SearchBar handleTextChange={(text) => this.handleOnChange(text)} searchBooks={() => this.handleSearch(value)} placeholderTextColor={colors.placeholderTextColor}></SearchBar>
                    <View style={styles.contentContainer}>
                        <FlatList data={this.props.books.queryItems}
                            onEndReachedThreshold={0.7}
                            onEndReached={() => this.handleScroll(query)}
                            ListFooterComponent={<Footer loadingMore={this.state.loadingMore} />}
                            onRefresh={() => this.handleRefresh(query)}
                            refreshing={this.state.refreshing}
                            renderItem={
                                ({ item }, index) =>
                                    <BookList item={item} index={index} handleSave={this.handleSave} />}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <ListEmptyComponent text="Enter book name to search" />
                            } />

                    </View>
                    <SafeAreaView />
                </View>
            </View >
        );
    }
}


const mapStateToPros = state => {
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
    toogleIsLoadingBooks: (bool) => {
        dispatch(toogleIsLoadingBooks(bool))
    },
    searchBook: (book) => {
        dispatch(HandleSearch(book))
    },
    searchMoreBooks: (book, totalNumber) => {
        dispatch(searchMoreBooks(book, totalNumber))
    }
})

const wrapper = compose(
    connect(mapStateToPros, mapDispatchToProps),
    connectActionSheet
)
export default wrapper(HomeScreen)

