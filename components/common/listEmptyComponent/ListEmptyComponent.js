import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types'
import styles from "./ListEmptyComponentStyle"
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