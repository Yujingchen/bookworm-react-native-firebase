import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, TextInput, ActivityIndicator } from 'react-native';
import BookCount from "../components/Footer/BookCount"
import SearchBar from "../components/SearchBar/SearchBar"
import ActionButton from "../components/Common/ActionButton"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import { snapshotToArray } from "../helper/firebaseHelpers"
import { Ionicons } from '@expo/vector-icons';
import ListItem from "../components/Common/ListItem"
import * as Animatabale from "react-native-animatable"
import { connect } from "react-redux"
import Swipeout from "react-native-swipeout"
import { compose } from "redux"
import { connectActionSheet } from "@expo/react-native-action-sheet"
class HomeScreen extends React.Component {
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
        const user = this.props.navigation.getParam('user')
        const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
        const books = await firebase.database().ref('books').child(user.uid).once('value')
        const booksArray = snapshotToArray(books)
        this.setState({
            currentUser: currentUserData.val(),
        })
        this.props.loadBooks(booksArray.reverse())
        this.props.toogleIsLoadingBooks(false)
        console.log(this.props.books)
    }
    componentDidUpdate(preveProps, prevState) {
        if (prevState.readCount < this.state.readCount) {
            console.log('fetch data')
        }
        console.log('update')
    }

    handleOnChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    showAddNewBook = () => {
        this.setState({ isAddNewBookVisible: true })
    }
    cancelAddBook = () => {
        this.setState({ isAddNewBookVisible: false })
    }
    confirmAddBook = async (bookName) => {
        this.setState({ value: '' });
        this.textInputRef.setNativeProps({ text: '' });
        try {
            console.log("Try to Add book")
            this.props.toogleIsLoadingBooks(true)
            const snapshot = await firebase.database().ref('books').child(this.state.currentUser.uid).orderByChild('name').equalTo(bookName).once("value")
            if (snapshot.exists()) {
                alert("Unable to add as book already exist")
            }
            else {
                console.log("Adding book")
                const key = await firebase.database().ref('books').child(this.state.currentUser.uid).push().key
                const response = await firebase.database().ref('books').child(this.state.currentUser.uid).child(key).set({ name: bookName, read: false })
                const user = this.props.navigation.getParam('user')
                const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
                const books = await firebase.database().ref('books').child(user.uid).once('value')
                // const booksArray = snapshotToArray(books)
                // this.setState((state, props) => ({
                //     books: booksArray,
                //     booksReading: [...state.booksReading, { name: bookName, read: false }],
                //     isAddNewBookVisible: false
                // }), () => { console.log(this.state) }
                // );
                this.props.addBook({ name: bookName, read: false, key: key })
                this.props.toogleIsLoadingBooks(false)
            }
        }
        catch (error) {
            console.log(error)
            this.props.toogleIsLoadingBooks(false)

        }
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
            const user = this.props.navigation.getParam('user')
            const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
            const books = await firebase.database().ref('books').child(user.uid).once('value')
            // const booksArray = snapshotToArray(books)
            // let booksReading = this.state.booksReading.filter(book => book.name !== selectedBook.name)
            // this.setState(preveState => ({
            //     books: booksArray,
            //     booksReading: booksReading,
            //     booksRead: [...preveState.booksRead, { name: selectedBook.name, read: true }],
            // }))
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
            const user = this.props.navigation.getParam('user')
            const currentUserData = await firebase.database().ref('/users/' + user.uid).once('value')
            const books = await firebase.database().ref('books').child(user.uid).once('value')
            this.props.markBookAsUnread(selectedBook)
            this.props.toogleIsLoadingBooks(false)
        }
        catch (error) {
            console.log(error)
            this.props.isLoadingBooks(false)
        }
    }

    deleteBook = async (selectedBook, index) => {
        console.log("deleting book")
        this.props.toogleIsLoadingBooks(true)
        await firebase.database().ref('books').child(this.state.currentUser.uid).child(selectedBook.key).remove()
        this.props.deleteBook(selectedBook)
        this.props.toogleIsLoadingBooks(false)
    }
    catch(error) {
        console.log(error)
        this.props.isLoadingBooks(false)
    }

    openImageLibrary=async(selectedBook)=>{
        
    }

    openCamera = async(selectedBook)=>{

    }

    addBookImage = (selectedBook) => {
        const options = ['Select from Photos', 'Camera', 'Cancel']
        const cancelButtonIndex = 2;
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            }
        ),
            buttonIndex => {
                if (buttonIndex == 0) {
                    this.openImageLibary(selectedBook)
                }
                else if (buttonIndex == 1) {
                    this.openCamera(selectedBook)
                }
            }
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
                            <Text style={{ color: colors.textWhite }}> Mark as Read </Text>
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



    // <View style={{
    //     minHeight: 100, flexDirection: "row", backgroundColor: colors.listItemBg, alignItems: "center",
    //     marginVertical: 5
    // }}>
    //     <View style={{ height: 70, width: 70, marginLeft: 10 }}>
    //         <Image source={require("../assets/icon.png")} style={{ flex: 1, height: null, width: null, borderRadius: 35 }}></Image>

    //     </View>

    //     <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
    //         <Text style={{
    //             fontWeight: 100,
    //             fontSize: 22,
    //             color: colors.textWhite
    //         }}>{item.name}</Text>
    //     </View>

    // </View>

    render() {
        const { totalCount, readingCount, readCount, isAddNewBookVisible, books, booksReading, booksRead, value } = this.state
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

                    {/* input field */}
                    <View style={styles.inputFieldContainer}>
                        <TextInput onChangeText={text => this.setState({
                            value: text
                        })} style={styles.inputField}
                            placeholder="Enter Search Term"
                            placeholderTextColor={colors.textPlaceholder}
                            ref={component => { this.textInputRef = component }}>
                        </TextInput>
                        {/* <TextInput onChangeText={text => this.setState({
                        value: text
                    })} style={styles.inputField}
                        placeholder="Enter Search Term"
                        placeholderTextColor="#454545">
                    </TextInput>
                    <ActionButton style={{ backgroundColor: colors.bgSuccess }} onPress={() => this.confirmAddBook(value)}>
                        <Ionicons name="ios-checkmark" color="white" size={40}>
                        </Ionicons>
                    </ActionButton>
                    <ActionButton onPress={() => this.cancelAddBook()}>
                        <Ionicons name="ios-close" color="white" size={40}>
                        </Ionicons>
                    </ActionButton> */}
                    </View>

                    {/* booklist */}

                    <View style={styles.contentContainer}>


                        <FlatList data={this.props.books.books} renderItem={
                            ({ item }, index) =>
                                this.renderItem(item, index)}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={
                                <View style={styles.warningMessage}>
                                    <Text style={{ fontWeight: "bold" }}>Not Reading Any Book</Text>
                                </View>
                            } />

                        {value.length > 0 ?
                            <ActionButton onPress={() => this.confirmAddBook(value)}
                                style={{ backgroundColor: "#AAD1E6", borderRadius: 25 }} position="right" >
                                <Text style={{ color: "white", fontSize: 30 }}>+</Text>
                            </ActionButton>
                            : null}
                    </View>


                    {/* footer */}
                    {/* <View style={styles.bottomBarContainer}>
                    <BookCount title="Total Books" count={books.length}></BookCount>
                    <BookCount title="Reading" count={booksReading.length}></BookCount>
                    <BookCount title="Read" count={booksRead.length}></BookCount>
                </View> */}
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

const mapDispatchToPros = dispatch => {
    return {
        loadBooks: books =>
            dispatch({
                type: 'LOAD_BOOKS_FROM_SERVER', payload: books
            }),
        markBookAsRead: book =>
            dispatch({
                type: 'Mark_BOOK_AS_READ',
                payload: book,
            }),
        markBookAsUnread: book =>
            dispatch({
                type: "Mark_BOOK_AS_UNREAD",
                payload: book
            }),
        addBook: book =>
            dispatch({ type: 'ADD_BOOK', payload: book }),
        deleteBook: book =>
            dispatch({ type: "DELETE_BOOK", payload: book }),
        toogleIsLoadingBooks: bool =>
            dispatch({ type: "TOGGLE_IS_LOADING_BOOKS", payload: bool })

    }
}
const wrapper = compose(
    connect(mapStateToPros, mapDispatchToPros),
    connectActionSheet

)
export default wrapper(HomeScreen)
//style
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
    inputFieldContainer: {
        height: 50,
        flexDirection: "row",
        margin: 5
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
