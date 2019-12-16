import React, { Component } from 'react';

import { View, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import colors from "../../assets/colors"
import ActionButton from "../../components/Common/ActionButton"
class WelcomSceen extends Component {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
                <View style={{ flex: 1, alignItem: 'center', justifyContent: "center" }}>
                    <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor}></Ionicons>
                    <Text style={{ fontSize: 50, fontWeight: '100', color: "white" }}>Book Worm</Text>
                </View>
                <View style={{ flex: 1, alignItems="center" }}>
                    <ActionButton title="Login" onpress={() => this.props.navigation.navigate('HomeScreen')} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgPrimary, marginBottom: 10 }}>
                        <Text style={{ fontWeight: "100", color: "white" }}>Login in</Text>
                    </ActionButton>
                    <ActionButton title="Sign up" onpress={() => this.props.navigation.navigate('SignUpScreen')} style={{ width: 200, backgroundColor: 'transparent', borderWidth: 0.5, borderColor: colors.bgError }}>
                        <Text style={{ fontWeight: "100", color: "white" }}>Sign up</Text>
                    </ActionButton>
                </View>
            </View>
        );
    }
}

export default WelcomSceen;