import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import LayoutStyles from "./LayoutStyles"
import ScreenHead from "./Head"
class Layout extends React.Component {

    render() {

        const layout =
            (<View style={LayoutStyles.body}>
                {this.props.children}
            </View>)

        return (
            <SafeAreaView>{layout}</SafeAreaView>
        )
    }
}
export default Layout