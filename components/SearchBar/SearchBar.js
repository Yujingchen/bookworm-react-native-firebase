import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import ActionButton from "../Common/ActionButton"
import colors from "../../assets/colors"
class InputBar extends Component {
    render() {
        return (
            <View style={styles.inputFieldContainer}>
                <TextInput onChange={this.props.onChangeText} style={styles.inputField}
                    placeholder="Enter Book Name" placeholderTextColor={this.props.placeholderTextColor}>
                </TextInput>
                <ActionButton style={{ backgroundColor: colors.bgSuccess }} onPress={this.props.confirm}>
                    <Ionicons name="ios-checkmark" color="white" size={40}>
                    </Ionicons>
                </ActionButton>
                <ActionButton onPress={this.props.cancel}>
                    <Ionicons name="ios-close" color="white" size={40}>
                    </Ionicons>
                </ActionButton>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    inputFieldContainer: {
        height: 50,
        flexDirection: "row"
    },
    textBox: {
        backgroundColor: '#dcdcdc',
        color: '#121212',
        flex: 1,
        padding: 5,
    },
});

export default InputBar;