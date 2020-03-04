import React, { Component } from 'react';

import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../../assets/colors"
import ListItem from "../../components/common/listItem/ListItem"
import { connect } from "react-redux"
import ListEmptyComponent from "../../components/common/listEmptyComponent/ListEmptyComponent"
class BooksReadScreen extends Component {
    renderItem = (item) => {
        return <ListItem item={item} />
    }

    render() {
        return (
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
                <FlatList data={this.props.books.booksRead} renderItem={
                    ({ item }, index) =>
                        this.renderItem(item, index)}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={!this.props.books.isLoadingBooks && (<ListEmptyComponent text="No Books Reading">
                    </ListEmptyComponent>)
                    }
                />
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


export default connect(mapStateToProps)(BooksReadScreen);