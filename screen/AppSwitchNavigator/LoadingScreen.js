import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import ActionButton from "../components/Common/ActionButton"
import colors from "../../assets/colors"
import * as firebase from "firebase"

import 'firebase/auth'
import { Colors } from 'react-native/Libraries/NewAppScreen';
class LoadingScreen extends Component {
    componentDidMount() {
        this.checkIfLoggedIn()
    }
    checkIfLoggedIn = () => {
        this.unsubscribe = firsebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('HomeScreen', { user })
            }
            else {
                this.props.navigation.navigate('LoginStackNavigator')
            }
        })
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }
    render() {
        return (
            <View style={styles.container}>
                <Text><ActivityIndicator size="large" color={colors.logoColor}></ActivityIndicator></Text>
                <ActionButton title="Sign up" onpress={() => this.props.navigation.navigate('WelcomeScreen')} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgError }}>
                    <Text style={{ fontWeight: "100", color: "white" }}>Log out</Text>
                </ActionButton>
            </View>
        );
    }
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.bgMain
    }
})