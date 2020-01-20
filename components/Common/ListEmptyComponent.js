import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
import PropTypes from 'prop-types'
const ListEmptyComponent = ({ text }) => {
    return (
        <View style={styles.ListEmptyComponent}>
            <Text style={styles.ListEmptyComponentText}>
                {text}
            </Text>
        </View>
    );
}

ListEmptyComponent.propTypes = {
    text: PropTypes.string.isRequired,
}

export default ListEmptyComponent;

const styles = StyleSheet.create({

    ListEmptyComponent: {
        marginTop: 50,
        alignItems: 'center'
    },
    ListEmptyComponentText: {
        fontWeight: 'bold',
        color: colors.textWhite
    }
})