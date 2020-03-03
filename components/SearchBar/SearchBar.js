import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import ActionButton from "../Common/ActionButton"
import colors from "../../assets/colors"
class InputBar extends Component {

    render() {
        return (
            <View style={styles.inputFieldContainer}>
                <TextInput onChangeText={(text) => this.props.handleTextChange(text)} style={styles.inputField}
                    placeholder="Enter Book Name" placeholderTextColor={this.props.placeholderTextColor}>
                </TextInput>
                <ActionButton style={{ backgroundColor: colors.bgSuccess }} onPress={this.props.searchBooks}>
                    <Ionicons name="ios-checkmark" color="white" size={40}>
                    </Ionicons>
                </ActionButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputFieldContainer: {
        height: 50,
        flexDirection: "row",
    },
    textBox: {
        backgroundColor: '#dcdcdc',
        color: '#121212',
        flex: 1,
        padding: 5,
    }, inputField: {
        backgroundColor: "transparent",
        color: colors.textWhite,
        borderColor: colors.listItemBg,
        flex: 1,
        padding: 5,
        fontSize: 22,
        fontWeight: "200",
    }
});

export default InputBar;