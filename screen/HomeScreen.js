import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import { connect } from "react-redux"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import { loadBooks, addBook, toogleIsLoadingBooks } from "../store/action/book"
import { HandleSearch, searchMoreBooks } from "../store/action/search"
import styles from '../styles/Stylesheet'
import Footer from "../components/footer/Footer"
import BookList from "../components/book/BookList"
import SearchBar from "../components/searchBar/SearchBar"
import ListEmptyComponent from "../components/common/listEmptyComponent/ListEmptyComponent"
import colors from "../assets/colors"
import { snapshotToArray } from "../helper/firebaseHelpers"

import * as firebase from "firebase/app"
import "firebase/storage"

class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            value: "",
            query: "",
            result: [],
            maxResults: 10,
            startIndex: 0,
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

    handleSearch = async (bookName, maxResults) => {
        console.log(`Search with key word: ${bookName}`)
        this.setState({ query: bookName, startIndex: 0 })
        this.props.searchBook(bookName, maxResults)
    }

    handleScroll = async (query) => {
        let moreToFetch = this.props.status
        let totalItems = this.props.totalItems
        if (moreToFetch && totalItems > 10) {
            const { maxResults, startIndex } = this.state
            console.log(`Search with key word: ${query}, fetching ${maxResults} items, Index ${startIndex}`)
            this.props.searchMoreBooks(query, maxResults, startIndex)
            this.setState({ loadingMore: true })
            this.setState((prevState) => {
                return {
                    startIndex: prevState.startIndex + 10,
                }
            })
        }
        else {
            console.log("fail to load more")
            this.setState(() => {
                return {
                    loadingMore: false
                }
            })
        }
    }

    handleSave = async (item) => {
        try {
            const snapshot = await firebase.database().ref('books').child(this.state.currentUser.uid).orderByChild('name').equalTo(item.name).once("value")
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

    handleRefresh = (query, maxResults) => {
        if (query) {
            this.setState({ refreshing: true, startIndex: 0 },
                () => {
                    this.props.searchBook(query, maxResults)
                    this.setState({ refreshing: false })
                }
            );
        }
    };

    render() {
        const { value, query, loadingMore, maxResults } = this.state
        return (
            <View style={styles.container} >
                <SafeAreaView style={styles.safeArea} />
                <View style={styles.container} >

                    <SearchBar
                        handleTextChange={(text) => this.handleOnChange(text)}
                        searchBooks={() => this.handleSearch(value, maxResults)}
                        placeholderTextColor={colors.placeholderTextColor}>
                    </SearchBar>

                    <View style={styles.contentContainer}>
                        <FlatList data={this.props.books}
                            onEndReachedThreshold={0.7}
                            onEndReached={() => this.handleScroll(query)}
                            ListFooterComponent={<Footer loadingMore={loadingMore} />}
                            onRefresh={() => this.handleRefresh(query, maxResults)}
                            refreshing={this.state.refreshing}
                            renderItem={
                                ({ item }, index) =>
                                    <BookList item={item} index={index} handleSave={this.handleSave} />}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <ListEmptyComponent text="Enter book name to search   " />
                            }
                        />
                    </View>
                    <SafeAreaView />
                </View>
            </View >
        );
    }
}

const mapStateToPros = state => {
    return {
        books: state.books.queryItems,
        status: state.books.status,
        totalItems: state.books.totalItems
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
    searchBook: (book, maxResults) => {
        dispatch(HandleSearch(book, maxResults))
    },
    searchMoreBooks: (book, maxResults, startIndex) => {
        dispatch(searchMoreBooks(book, maxResults, startIndex))
    }
})

const wrapper = compose(
    connect(mapStateToPros, mapDispatchToProps),
    connectActionSheet
)
export default wrapper(HomeScreen)

