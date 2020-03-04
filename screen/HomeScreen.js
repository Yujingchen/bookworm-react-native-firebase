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
            loadMore: true,
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
        console.log(`Search with key word: ${bookName}`)
        this.setState({ query: bookName })
        this.props.searchBook(bookName)
    }
    handleScroll = async (query) => {
        const { maxResults, startIndex, loadMore } = this.state

        if (loadMore) {
            try {
                this.setState({ loadingMore: true })
                this.props.searchMoreBooks(query, maxResults, startIndex)
                console.log(`Search with key word: ${query}, fetching ${maxResults} items, Index ${startIndex}`)

                this.setState((prevState) => {
                    return {
                        startIndex: prevState.startIndex + 1
                    }
                })
            }
            catch {
                console.log("Fail to load more")
                this.setState({
                    loadMore: false,
                    loadingMore: false
                })
            }
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
            this.setState({ maxResults: 10, refreshing: true },
                () => {
                    this.props.searchBook(query)
                    this.setState({ refreshing: false })
                }
            );
        }
    };

    render() {
        const { value, query, loadingMore } = this.state
        return (
            <View style={styles.container} >
                <SafeAreaView style={styles.safeArea} />
                <View style={styles.container} >

                    <SearchBar
                        handleTextChange={(text) => this.handleOnChange(text)}
                        searchBooks={() => this.handleSearch(value)}
                        placeholderTextColor={colors.placeholderTextColor}>
                    </SearchBar>

                    <View style={styles.contentContainer}>
                        <FlatList data={this.props.books.queryItems}
                            onEndReachedThreshold={0.7}
                            onEndReached={() => this.handleScroll(query)}
                            ListFooterComponent={<Footer loadingMore={loadingMore} />}
                            onRefresh={() => this.handleRefresh(query)}
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
    searchMoreBooks: (book, maxResults, startIndex) => {
        dispatch(searchMoreBooks(book, maxResults, startIndex))
    }
})

const wrapper = compose(
    connect(mapStateToPros, mapDispatchToProps),
    connectActionSheet
)
export default wrapper(HomeScreen)

