import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import BookCount from "../components/Footer/BookCount"
import InputBar from "../components/InputBar/InputBar"
import ActionButton from "../components/Common/ActionButton"
import colors from "../assets/colors"


export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            totalCount: 0,
            readingCount: 0,
            readCount: 0,
            isAddNewBookVisible: false,
            value: "",
            books: []
        }
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
    confirmAddBook = (name) => {
        this.setState((state, props) => ({
            book: [...state.books, book],
            totalCount: state.totalCount + 1,
            readingCount: state.readingCount + 1
        }))
        this.setState({ isAddNewBookVisible: false })
    }
    markAsRead = (selectedBook, index) => {
        let newList = this.state.books.filter(book => {
            book !== selectedBook
        })
        this.setState(preveState => ({
            books: newList,
            readingCount: preveState.readingCount - 1,
            readCount: preveState.readCount + 1
        }))
    }
    renderItem = (item, index) => (
        <View style={{ height: 50, flexDirection: "row" }}>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <Text>{item}</Text>
            </View>
            {/* <TouchableOpacity onPress={() => markAsRead(item, index)}>
        <View style={{
          width: 100,
          height: 50,
          backgroundColor: "a5deba",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Text style={{ fontWeight: 'bold', color: "white" }}>Mark as read</Text>
        </View>
      </TouchableOpacity> */}
            <ActionButton onPress={() => this.markAsRead(item, index)} style={{ width: 100, backgroundColor: colors.bgSuccess }} >
                <Text style={{ fontWeight: 'bold', color: "white" }}>Mark as read</Text>
            </ActionButton>
        </View>
    )
    render() {
        const { totalCount, readingCount, readCount, isAddNewBookVisible } = this.state
        return (
            <View style={{ flex: 1 }}>
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
                    <BookCount title="Book Title" count={totalCount}></BookCount>
                    <BookCount title="Reading" count={readingCount}></BookCount>
                    <BookCount title="Read" count={readCount}></BookCount>
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
