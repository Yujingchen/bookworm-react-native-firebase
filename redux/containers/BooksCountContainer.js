import React, { Component } from 'react';
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
import PropTypes from 'prop-types'
import { connect } from "react-redux"

const BooksCountContainer = ({ color, type, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: color }}>
                {props.books[type].length || 0}

            </Text>
        </View>
    );
}

BooksCountContainer.propTypes = {
    color: PropTypes.string,
    type: PropTypes.string.isRequired
}
BooksCountContainer.defaultProps = {
    color: colors.textPlaceholder
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }

})
const mapStateToProps = state => {
    return {
        books: state.books
    }
}


export default connect(mapStateToProps)(BooksCountContainer);