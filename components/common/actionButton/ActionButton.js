import React from "react"
import { View, StyleSheet, TouchableOpacity, style } from "react-native"
import PropTypes from "prop-types"
import colors from "../../../assets/colors"
getPosition = (position) => {
    switch (position) {
        case 'left':
            return {
                position: "absolute", bottom: 270, left: 20, elevation: 3,

            }
        default:
            return {
                position: "absolute", bottom: 270, right: 20, elevation: 3,

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
        backgroundColor: colors.bgError,
        justifyContent: "center",
        alignItems: "center"
    }
})
ActionButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

ActionButton.defaultProps = {
    style: {}
}
export default ActionButton;