import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native"
import ActionButton from "../components/Common/ActionButton"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import 'firebase/auth'

class SettingsScreen extends Component {
    signOut = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('WelcomeScreen')
        }
        catch (error) {
            alert('Unable to sign out')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>SettingsScreen</Text>
                <ActionButton title="Sign up" onpress={() => this.signOut} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgError }}>
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