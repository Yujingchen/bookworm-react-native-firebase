import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons"
import ActionButton from "../common/actionButton/ActionButton"
import styles from "./searchBarStyle"
import colors from "../../assets/colors"
class InputBar extends Component {

    render() {
        return (
            <View style={styles.inputFieldContainer}>
                <TextInput onChangeText={(text) => this.props.handleTextChange(text)} style={styles.inputField}
                    placeholder="Book name..." placeholderTextColor={this.props.placeholderTextColor}>
                </TextInput>
                <ActionButton style={{ backgroundColor: colors.bgSuccess }} onPress={this.props.searchBooks}>
                    <Ionicons name="ios-checkmark" color="white" size={40}>
                    </Ionicons>
                </ActionButton>
            </View>
        );
    }
}


export default InputBar;