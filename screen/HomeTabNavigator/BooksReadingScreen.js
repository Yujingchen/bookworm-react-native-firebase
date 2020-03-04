import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../../assets/colors"
import ListItem from "../../components/common/listItem/ListItem"
import { connect } from "react-redux"
import ListEmptyComponent from "../../components/common/listEmptyComponent/ListEmptyComponent"
import { snapshotToArray } from "../../helper/firebaseHelpers"
import Swipeout from "react-native-swipeout"
import "firebase/storage"
import * as firebase from "firebase/app"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
import * as ImageHelpers from "../../helper/ImageHelpers"
import {
    loadBooks, markBookAsRead, markBookAsUnread, addBook,
    deleteBook, toogleIsLoadingBooks, updateBookImage
} from "../../store/action/book"
class BooksReadingScreen extends Component {
    constructor() {
        super()
        this.state = {
            totalCount: 0,
            readingCount: 0,
            readCount: 0,
            isAddNewBookVisible: false,
            value: "",
            books: [],
            booksReading: [],
            booksRead: [],
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

    markAsRead = async (selectedBook, index) => {
        try {
            this.props.toogleIsLoadingBooks(true)
            await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).update({ read: true })

            let newList = this.state.books.filter(book => {
                if (book.name == selectedBook.name) {
                    return { ...book, read: true }
                }
                return book
            }
            )
            const user = await firebase.auth().currentUser
            const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
            const books = await firebase.database().ref('books').child(user.uid).once('value')
            this.props.markBookAsRead(selectedBook)
            this.props.toogleIsLoadingBooks(false)

        }

        catch (error) {
            console.log(error)
            this.props.toogleIsLoadingBooks(false)
        }
    }

    markAsUnread = async (selectedBook, index) => {
        try {
            this.props.toogleIsLoadingBooks(true)
            await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).update({ read: false })
            const user = await firebase.auth().currentUser
            const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
            const books = await firebase.database().ref('books').child(user.uid).once('value')
            this.props.markBookAsUnread(selectedBook)
            this.props.toogleIsLoadingBooks(false)
        }
        catch (error) {
            console.log(error)
            this.props.toogleIsLoadingBooks(false)
        }
    }

    deleteBook = async (selectedBook, index) => {
        this.props.toogleIsLoadingBooks(true)
        await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).remove()
        this.props.deleteBook(selectedBook)
        this.props.toogleIsLoadingBooks(false)
    }
    catch(error) {
        console.log(error)
        this.props.toogleIsLoadingBooks(false)
    }
    uploadImage = async (image, selectedBook) => {
        const ref = firebase.storage().ref('books').child(this.state.currentUser.uid).child(selectedBook.key)

        try {
            //converting to blob
            const blobImage = await ImageHelpers.prepareBlob(image.uri)
            const snapshot = await ref.put(blobImage)
            //put blob image in storage
            let downloadUrl = await ref.getDownloadURL()
            await firebase.database().ref('books')
                .child(this.state.currentUser.uid).child(selectedBook.key)
                .update({ image: downloadUrl })
            // downloadUrl into database
            blobImage.close()
            return downloadUrl
        }
        catch (error) {
            console.log(error)
        }
    }
    openImageLibrary = async (selectedBook) => {
        const result = await ImageHelpers.openImageLibrary();
        if (result) {
            this.props.toogleIsLoadingBooks(true)
            const downloadUrl = await this.uploadImage(result, selectedBook)
            this.props.updateBookImage({ ...selectedBook, uri: downloadUrl })
            this.props.toogleIsLoadingBooks(false)
        }
    }

    openCamera = async (selectedBook) => {
        const result = await ImageHelpers.openCamera()
        if (result) {
            this.props.toogleIsLoadingBooks(true)
            const downloadUrl = await this.uploadImage(result, selectedBook)
            this.props.updateBookImage({ ...selectedBook, uri: downloadUrl })
            this.props.toogleIsLoadingBooks(false)
        }
    }

    addBookImage = (selectedBook) => {
        const options = ['Select from Photos', 'Camera', 'Cancel']
        const cancelButtonIndex = 2;
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },

            buttonIndex => {
                if (buttonIndex == 0) {
                    this.openImageLibrary(selectedBook)
                }
                else if (buttonIndex == 1) {
                    this.openCamera(selectedBook)
                }
            }
        )
    }
    renderItem = (item, index) => {
        let swipeoutButtons = [
            {
                text: 'Delete',
                component: (
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Ionicons name="ios-trash" size={24} color={colors.textWhite}>
                        </Ionicons>
                    </View>
                ),
                backgroundColor: colors.bgDelete,
                onPress: () => this.deleteBook(item, index)
            }
        ]
        if (!item.read) {
            swipeoutButtons.unshift(
                {
                    text: 'Mark Read',
                    component: (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.textWhite }}> Add to favourite </Text>
                        </View>
                    ),
                    backgroundColor: colors.bgSuccessDark,
                    onPress: () => this.markAsRead(item, index)
                }
            )
        }
        else {
            swipeoutButtons.unshift(
                {
                    text: 'Mark Unread',
                    component: (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.textWhite }}> Mark Unread </Text>
                        </View>
                    ),
                    backgroundColor: colors.bgUnread,
                    onPress: () => this.markAsUnread(item, index)
                }
            )
        }
        return (
            <Swipeout backgroundColor={colors.bgMain} style={{ marginHorizontal: 5, marginVertical: 5 }}
                right={swipeoutButtons} autoClose={true}>
                < ListItem onPress={() => this.addBookImage(item)} marginVertical={0} item={item} editable={true}>
                    {
                        item.read &&
                        (<Ionicons name="ios-checkmark" color={colors.logoColor} size={30}></Ionicons>)
                    }
                </ListItem >
            </Swipeout>
        )

    }


    render() {
        return (
            <View style={styles.container} >
                {this.props.books.toogleIsLoadingBooks && (<View style={{
                    ...StyleSheet.absoluteFill,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000,
                    elevation: 1000
                }}>
                    <ActivityIndicator size="large" color={colors.logoColor}></ActivityIndicator>
                </View>)}
                <FlatList data={this.props.books.books} renderItem={
                    ({ item }, index) =>
                        this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={!this.props.books.toogleIsLoadingBooks && (<ListEmptyComponent text="No Books Reading">
                    </ListEmptyComponent>)
                    } />
            </ View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colors.bgMain
    },
    warningMessage: {
        marginTop: 50,
        alignItems: 'center'
    },

})
const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = dispatch => ({
    loadBooks: (books) => {
        dispatch(loadBooks(books))
    },
    markBookAsRead: (book) => {
        dispatch(markBookAsRead(book))
    },
    markBookAsUnread: (book) => {
        dispatch(markBookAsUnread(book))
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
    updateBookImage: (book) => {
        dispatch(updateBookImage(book))
    }
})

const wrapper = compose(
    connect(mapStateToProps, mapDispatchToProps),
    connectActionSheet
)
export default wrapper(BooksReadingScreen);