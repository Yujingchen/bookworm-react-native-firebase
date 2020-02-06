import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native"
import ActionButton from "../../components/Common/ActionButton"
import colors from "../../assets/colors"
import * as firebase from "firebase"

import 'firebase/auth'
class LoadingScreen extends Component {
    componentDidMount() {
        this._isMounted = true;
        this.checkIfLoggedIn()
    }
    checkIfLoggedIn = () => {
        //onAuth listener, which is connected to firebase auth, everytime user login this will check if user login
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.navigation.navigate('HomeScreen', { user })
            }
            else {
                this.props.navigation.navigate('LoginStackNavigator')
            }
        })
    }

    UNSAFE_componentWillUnMount = () => {
        this._isMounted = false;
        this.unsubscribe();
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={colors.logoColor}></ActivityIndicator>
                <ActionButton title="Sign up" onPress={() => this.props.navigation.navigate('WelcomeScreen')} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgError }}>
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