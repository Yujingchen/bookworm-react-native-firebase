import React, { Component } from 'react';
import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
import PropTypes from 'prop-types'

export const BottomTabIcon = ({ color, iconName, ...props }) => {
    if (color, iconName != undefined) {
        return (
            <View style={styles.container}>
                <Text style={{ color: color }}>
                    {Icon(iconName, colors.black, 32)}
                </Text>
            </View>
        );
    }
}
export const DefaultIcon = ({ color, iconName, ...props }) => {
    if (color, iconName != undefined) {
        return (
            <View style={styles.container}>
                <Text style={{ color: color }}>
                    {props.children}
                    {Icon(iconName, "#c7c6ca", props.size)}
                </Text>
            </View>
        )
    }
}


const Icon = (name, color, size) => {
    if (name != undefined) {
        return <Ionicons name={name} color={color} size={size}></Ionicons>
    }
    return <Ionicons name="ios-alert" color={colors.black} size={25}></Ionicons>
}

BottomTabIcon.propTypes = {
    color: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}
BottomTabIcon.defaultProps = {
    color: colors.textPlaceholder,
}
DefaultIcon.propTypes = {
    color: PropTypes.string,
    iconName: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
}
DefaultIcon.defaultProps = {
    color: colors.textPlaceholder,
    size: 20,
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})

