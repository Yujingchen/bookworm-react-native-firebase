import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import BookCount from "../components/Footer/BookCount"
import InputBar from "../components/InputBar/InputBar"
import ActionButton from "../components/Common/ActionButton"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import { snapshotToArray } from "../helper/firebaseHelpers"
import { Ionicons } from '@expo/vector-icons';
import ListItem from "../components/Common/ListItem"
export default class HomeScreen extends React.Component {
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
    }
    componentDidMount = async () => {
        const { navigation } = this.props
        const user = navigation.getParam('user')
        const currentUserData = await firebase.database.ref('users/').child(user.uid).once('value')
        const books = await firebase.ref('books').child(user.uid).once('value')
        const booksArray = snapshotToArray(books)
        this.setState({
            currentUser: currentUserData.val(), books: booksArray, booksReading: booksArray.filter(book => !book.read),
            booksRead: booksArray.filter(book => !book.read)
        })
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
    confirmAddBook = async (book) => {
        try {
            const snapshot = await firebase.database.ref('books').child(this.state.currentUser.uid).orderByChild('name').equalTo(book).once("value")
            if (snapshot.exist()) {
                alert("Unable to add as book already exist")
            }
            else {
                const key = await firebase.database.ref('books').child(this.state.currentUser.uid).push().key
                const response = await firebase.database().ref('books').child(this.state.currentUser.uid).child(key).set({ name: book, read: false })
                this.setState((state, props) => ({
                    book: [...state.books, { name: book, read: false }],
                    booksReading: [...state.booksReading, { name: book, read: false }],
                    // totalCount: state.totalCount + 1,
                    // readingCount: state.readingCount + 1,
                    isAddNewBookVisible: false
                }))
                this.setState({ isAddNewBookVisible: false })
            }

        }
        catch (error) {
            console.log(error)
        }

    }
    markAsRead = async (selectedBook, index) => {
        try {
            await firebase.database.ref('books').child(this.state.currentUser.uid).child(selectedBook.key).update({ read: true })
            let newList = this.state.books.filter(book => {
                if (book.name == selectedBook.name) {
                    return { ...book, read: true }
                }
                return book
            }


            )
            let booksReading = this.state.booksReading.filter(book => book.name !== selectedBook.name)
            this.setState(preveState => ({
                books: newList,
                booksReading: booksReading,
                booksRead: [...preveState.booksRead, { name: selectedBook.name, read: true }],
                // readingCount: preveState.readingCount - 1,
                // readCount: preveState.readCount + 1
            }))
        }
        catch (error) {
            console.log(error)
        }
    }
    renderItem = (item, index) => (
        <ListItem item={item}>
            {item.read ?
                <Ionicons name="ios-checkmart" color={colors.logoColor} size={30}></Ionicons> : (
                    <ActionButton onPress={() => this.markAsRead(item, index)} style={{ width: 100, backgroundColor: colors.bgSuccess }} >
                        <Text style={{ fontWeight: 'bold', color: "white" }}>Mark as read</Text>
                    </ActionButton>)}
        </ListItem>
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
    )
    render() {
        const { totalCount, readingCount, readCount, isAddNewBookVisible, books, booksReading, booksRead } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: colors.bgMain }} >
                <SafeAreaView style={{ backgroundColor: 'red' }} />
                <View style={styles.titleContainer}>
                    <Text>Book Worm</Text>
                </View>

                <View style={styles.contentContainer}>
                    {isAddNewBookVisible && (<InputBar confirm={() => this.confirmAddBook(this.state.value)} cancel={this.cancelAddBook} onInputChange={handleOnChange}></InputBar>)}



                    <FlatList data={this.state.books} renderItem={
                        ({ item }, index) =>
                            this.renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={
                            <View style={styles.warningMessage}>
                                <Text style={{ fontWeight: "bold" }}>Not Reading Any Book</Text>
                            </View>
                        } />


                    <ActionButton onPress={this.showAddNewBook} style={{ backgroundColor: "#AAD1E6", borderRadius: 25 }} position="left" >
                        <View style={styles.button}>
                            <Text style={{ color: "white", fontSize: 30 }}>+</Text>
                        </View>
                    </ActionButton>
                    {/* <TouchableOpacity style={styles.buttonContainer} onPress={this.showAddNewBook}>
            <View style={styles.button}></View>
          </TouchableOpacity> */}
                </View>
                <View style={styles.bottomBarContainer}>
                    <BookCount title="Total Books" count={books.length}></BookCount>
                    <BookCount title="Reading" count={booksReading.length}></BookCount>
                    <BookCount title="Read" count={booksRead.length}></BookCount>
                </View>
                <SafeAreaView style={{ backgroundColor: 'white' }} />
            </View >
        );
    }
}

const styles = StyleSheet.create({
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
        backgroundColor: colors.bgPrimary,
        alignItems: "center",
        justifyContent: "center"
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
    }
});
