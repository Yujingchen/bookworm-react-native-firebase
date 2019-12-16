import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native"
import ActionButton from "../components/Common/ActionButton"
import colors from "../assets/colors"
class SettingsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>SettingsScreen</Text>
                <ActionButton title="Sign up" onpress={() => this.props.navigation.navigate('WelcomeScreen')} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgError }}>
                    <Text style={{ fontWeight: "100", color: "white" }}>Log out</Text>
                </ActionButton>
            </View>
        );
    }
}

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain
    }
})