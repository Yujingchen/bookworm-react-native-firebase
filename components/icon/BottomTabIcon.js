import React, { Component } from 'react';
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
import PropTypes from 'prop-types'

const BottomTabIcon = ({ color, iconName, ...props }) => {
    return (
        <View style={styles.container}>
            <Text style={{ color: color }}>
                {tabIcon(iconName)}
            </Text>
        </View>
    );
}

const tabIcon = (name) => {
    if (name != undefined) {
        return <Ionicons name={name} color={colors.black} size={25}></Ionicons>
    }
    return <Ionicons name="ios-alert" color={colors.black} size={25}></Ionicons>
}

BottomTabIcon.propTypes = {
    color: PropTypes.string,
    iconName: PropTypes.string.isRequired
}
BottomTabIcon.defaultProps = {
    color: colors.textPlaceholder
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

export default BottomTabIcon;
