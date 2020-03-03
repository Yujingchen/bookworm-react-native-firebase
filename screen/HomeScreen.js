import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import SearchBar from "../components/SearchBar/SearchBar"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import { snapshotToArray } from "../helper/firebaseHelpers"
import { Ionicons } from '@expo/vector-icons';
import ListItem from "../components/Common/ListItem"
import { connect } from "react-redux"
import Swipeout from "react-native-swipeout"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import {
    loadBooks, saveBookToCollection, addBook,
    toogleIsLoadingBooks, HandleSearch, searchMoreBooks
} from "../redux/action/BookAction"
import "firebase/storage"
class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            value: "",
            result: [],
            totalItems: 10,
            loading: true,
            loadingMore: false,
            error: null,
            refreshing: false,
            currentUser: {}
        }
        this.userId = firebase.auth().currentUser.uid
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSearchBooks = this.handleSearchBooks.bind(this)
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
    componentDidUpdate(preveProps, prevState) {
        if (prevState.readCount < this.state.readCount) {
        }
    }
    handleOnChange = (text) => {
        this.setState({
            value: text
        })
    }
    handleSearchBooks = async (bookName) => {
        this.props.searchBook(bookName)
    }
    handleSearchMoreBooks = async (bookName) => {
        const { totalItems } = this.state
        try {
            this.setState(
                (prevState, nextProps) => {
                    if (prevState.totalItems <= 30) {
                        return (
                            {
                                totalItems: prevState.totalItems + 10,
                                loadingMore: true
                            })
                    }
                },
                () => {
                    this.props.searchMoreBooks(bookName, totalItems);
                }
            );
        }
        catch (error) {
            console.log("error")
            this.setState({ loadingMore: false })
        }
    }

    saveBookToCollection = async (item) => {
        try {
            this.props.toogleIsLoadingBooks(true)
            const snapshot = await firebase.database().ref('books').child(this.state.currentUser.uid).orderByChild('name').equalTo(item.name).once("value")
            if (snapshot.exists()) {
                alert("Unable to add as book already exist")
            }
            else {
                const key = await firebase.database().ref('books').child(this.state.currentUser.uid).push().key
                this.props.addBook({ name: item.name, read: false, key: key, image: item.image })
                this.props.toogleIsLoadingBooks(false)
            }
        }

        catch (error) {
            console.log(error)
            this.props.toogleIsLoadingBooks(false)
        }
    }

    handleRefresh = (bookName) => {
        console.log(bookName)
        this.setState(
            {
                totalItems: 10,
                refreshing: true
            },
            () => {
                console.log("pokk")
                this.props.searchBook(bookName)
            }
        );
    };


    renderItem = (item) => {
        let swipeoutButtons = [
            {
                text: 'Save',
                component: (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.textWhite }}> Save </Text>
                    </View>
                ),
                backgroundColor: colors.bgSuccessDark,
                onPress: () => this.saveBookToCollection(item)
            }
        ]

        return (
            <Swipeout backgroundColor={colors.bgMain} style={{ marginHorizontal: 5, marginVertical: 5 }}
                right={swipeoutButtons} autoClose={true}>
                < ListItem marginVertical={0} item={item} >
                    {
                        item.read &&
                        (<Ionicons name="ios-checkmark" color={colors.logoColor} size={30}></Ionicons>)
                    }
                </ListItem >
            </Swipeout>
        )
    }

    renderFooter = () => {
        if (!this.state.loadingMore) {
            console.log("not loading more")
            return null;
        }

        return (
            <View
                style={{
                    position: 'relative',
                    paddingVertical: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    elevation: 1000,
                    flex: 1,
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        const { value } = this.state
        return (
            <View style={styles.container} >
                <SafeAreaView style={{ backgroundColor: 'red' }} />
                <View style={styles.container} >
                    {this.props.books.isLoadingBooks && (<View style={{
                        ...StyleSheet.absoluteFill,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        elevation: 1000
                    }}>
                        <ActivityIndicator size="large" color={colors.logoColor}></ActivityIndicator>
                    </View>)}
                    <SearchBar handleTextChange={(text) => this.handleOnChange(text)} searchBooks={() => this.handleSearchBooks(value)} placeholderTextColor={colors.placeholderTextColor}></SearchBar>
                    <View style={styles.contentContainer}>
                        <FlatList data={this.props.books.queryItems}
                            onEndReachedThreshold={0.5}
                            onEndReached={() => this.handleSearchMoreBooks(value)}
                            ListFooterComponent={this.renderFooter}
                            onRefresh={() => this.handleRefresh(value)}
                            refreshing={this.state.refreshing}
                            renderItem={
                                ({ item }, index) =>
                                    this.renderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <View style={styles.warningMessage}>
                                    <Text style={{ fontWeight: "bold" }}>Enter book name to search books</Text>
                                </View>
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
    saveBookToCollection: (book) => {
        dispatch(saveBookToCollection(book))
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain
    },
    containerWrapper: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        height: 70,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomBarContainer: {
        height: 70,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderColor,
        flexDirection: "row"
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#123456',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: "absolute",
        bottom: 20,
        right: 20,
    },
    contentContainer: {
        flex: 1,
    },
    warningMessage: {
        marginTop: 50,
        alignItems: 'center'
    },

    inputField: {
        backgroundColor: "transparent",
        color: colors.textWhite,
        borderColor: colors.listItemBg,
        flex: 1,
        padding: 5,
        fontSize: 22,
        fontWeight: "200",
    }
});
