import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from "prop-types"
import styles from "./BookListStyle.js"
import { Ionicons } from '@expo/vector-icons';
import Swipeout from "react-native-swipeout"
import ListItem from "../common/listItem/ListItem"
import colors from "../../assets/colors"
const BookList = ({ item, handleSave }) => {
    let swipeoutButtons = [
        {
            text: 'Save',
            component: (
                <View style={styles.switchoutBtnContainer}>
                    <Text style={styles.switchoutBtnText}> Save </Text>
                </View>
            ),
            backgroundColor: colors.bgSuccessDark,
            onPress: () => handleSave(item)
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
    item: PropTypes.object.isRequired,
}

export default BookList;



