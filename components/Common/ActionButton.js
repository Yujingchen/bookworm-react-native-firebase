import React from "./node_modules/react"
import { View, Text, StyleSheet, TouchableOpacity, style } from "react-native"
import PropTypes from "./node_modules/prop-types"

getPosition = (position) => {
    switch (position) {
        case 'left':
            return {
                position: "absolute", left: 20, bottom: 20
            }
        default:
            return {
                position: "absolute", right: 20, bottom: 20
            }
    }
}

const ActionButton = ({ children, onPress, style, position }) => {
    const floatingActionButton = position ? getPosition(position) : []
    return (
        <TouchableOpacity onPress={onPress} style={floatingActionButton}>
            <View style={[styles.button, style]}>
                {children}
            </View>
        </TouchableOpacity>)
}




const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        backgroundColor: "#deada5",
        justifyContent: "center",
        alignItems: "center"
    }
})
ActionButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    style: PropTypes.object
}

ActionButton.defaultProps = {
    style: {}
}
export default ActionButton;