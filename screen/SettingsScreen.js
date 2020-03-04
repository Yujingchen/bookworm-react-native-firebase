import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native"
import ActionButton from "../components/common/actionButton/ActionButton"
import colors from "../assets/colors"
import * as firebase from "firebase/app"
import 'firebase/auth'
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('Setting a timer') <= -1) {
        _console.warn(message);
    }
};
class SettingsScreen extends Component {
    signOut = async () => {
        try {
            await firebase.auth().signOut()
            this.props.navigation.navigate('WelcomeScreen')
        }
        catch (error) {
            console.log('Unable to sign out')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActionButton title="Sign up" onPress={() => this.signOut()} style={styles.auth_button}>
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
    },
    auth_button: {
        width: 200,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        borderColor: colors.bgError
    }
})