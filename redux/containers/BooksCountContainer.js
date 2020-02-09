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
                {tabImage(type)}
            </Text>
        </View>
    );
}


tabImage = (type) => {
    if (type === "Collections") {
        return <Ionicons name="ios-folder" color={colors.logoColor} size={10}></Ionicons>
    }
    else if (type === "Complete") {
        return <Ionicons name="ios-checkmark" color={colors.logoColor} size={20}></Ionicons>
    }
    else if (type === "Books") {
        return <Ionicons name="ios-checkmark" color={colors.logoColor} size={20}></Ionicons>
    }
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