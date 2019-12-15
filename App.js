import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import BookCount from "./components/Footer/BookCount"
import InputBar from "./components/InputBar/InputBar"
export default class App extends React.Component {
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
      book: [...state.books, book]
    }))
    this.setState({ isAddNewBookVisible: false })
  }
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
          <TouchableOpacity style={styles.buttonContainer} onPress={this.showAddNewBook}>
            <View style={styles.button}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomBarContainer}>
          <BookCount title="Total" count={totalCount}></BookCount>
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
    borderBottomColor: 'E9E9E9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBarContainer: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: 'E9E9E9',
    flexDirection: "row"
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#AAD1E6",
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
});
