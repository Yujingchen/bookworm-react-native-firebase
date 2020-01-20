import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator } from "react-native"
import colors from '../assets/colors';
import ActionButton from "../components/Common/ActionButton"
import * as firebase from "firebase"
import 'firebase/database'
import 'firebase/auth'
class LoginScreen extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }
    onSignIn = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true })
            try {
                const response = await firebase.auth()
                    .signInWithEmailAndPassword(this.state.email,
                        this.state.password)
                if (response) {
                    this.setState({ isLoading: false })
                    this.props.navigation.navigate('LoadingScreen')
                }
            } catch (error) {
                this.setState({ isLoading: false })
                switch (error.code) {
                    case "auth/user-not-found":
                        alert('A user with that email does not exist. Try signing Up')
                        beark;
                    case "auth/invalid-email":
                        alert("Please enter an email address")
                }
            }
        }
        else {
            alert('Please enter an email and password')
        }
    };

    onSignUp = async () => {
        if (this.state.email && this.state.password) {
            this.setState({ isLoading: true });
            try {
                const response = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        this.state.email,
                        this.state.password
                    );
                this.setState({ isLoading: false });
                this.onSignIn(this.state.email, this.state.password);
            } catch (err) {
                if (err.code == 'auth/email-already-in-use') {
                    alert('Email already in use, Please try logging in.');
                }
                console.log('Error on async call ', err);
                console.log('Error is ', err.code);
                this.setState({ isLoading: false });
            }
        } else {
            alert('Please enter the both email and password to register.');
            this.setState({ isLoading: false });
        }
    };

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ? <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', zIndex: 1000, elevation: 1000 }]}>
                    <ActivityIndicator size='large' color={colors.logoColor}></ActivityIndicator>
                </View> : null}
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <TextInput
                        style={styles.textInput} placeholder="abc@example.com" placeholderTextColor={colors.bgTextInputDark} keyboardType="email-address" onChangeText={email => this.setState({ email })}></TextInput>
                    <TextInput
                        style={styles.textInput} placeholder="enter password" placeholderTextColor={colors.bgTextInputDark} secureTextEntry onChangeText={password => this.setState({ password })}></TextInput>
                    <View style={{ alignItems: 'center' }}>
                        <ActionButton style={[styles.loginButton, { borderColor: colors.bgPrimary }]} onPress={this.onSignIn}>
                            <Text style={{ color: 'white' }}>Login</Text>
                        </ActionButton>
                        <ActionButton style={[styles.loginButton, { color: colors.bgError }]} onPress={this.onSignUp}>
                            <Text style={{ color: 'white' }}>Sign Up</Text>
                        </ActionButton>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                </View>
            </View>
        );
    }
}

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgMain
    },
    textInput: {
        height: 50,
        borderWidth: 0.5,
        borderColor: colors.borderColor, marginHorizontal: 40,
        marginBottom: 10,
        color: colors.txtWhite,
        paddingHorizontal: 10
    },
    loginButton: {
        borderWidth: 0.5,
        backgroundColor: 'transparent',
        marginTop: 10,
        width: 200
    }
})