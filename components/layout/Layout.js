import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import layoutStyles from "../../styles/layout/layoutStyles"
import ScreenHead from "./Head"
class Layout extends React.Component {

    render() {

        const layout =
            (<View style={layoutStyles.screenBody}>
                {this.props.children}
            </View>)

        return (
            <SafeAreaView>{layout}</SafeAreaView>
        )
    }
}
export default Layout