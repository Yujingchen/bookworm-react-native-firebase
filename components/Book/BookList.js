import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types"
import styles from "./BookListStyle.js"
import { Ionicons } from '@expo/vector-icons';
import Swipeout from "react-native-swipeout"
import ListItem from "../Common/ListItem"

const BookList = ({ item }) => {
    let swipeoutButtons = [
        {
            text: 'Save',
            component: (
                <View style={styles.switchoutBtnContainer}>
                    <Text style={styles.switchoutBtnText}> Save </Text>
                </View>
            ),
            backgroundColor: styles.swipeoutBtnBg,
            onPress: () => this.handleSave(item)
        }
    ]

    return (
        <Swipeout style={styles.swipeoutContainer}
            right={swipeoutButtons} autoClose={true}>
            < ListItem marginVertical={0} item={item} >
                {
                    item.read &&
                    (<Ionicons name="ios-checkmark" color={styles.swipeoutIcon} size={30}></Ionicons>)
                }
            </ListItem >
        </Swipeout>
    )
}



BookList.propTypes = {
    loadingMore: PropTypes.object.isRequired,
}

export default BookList;



