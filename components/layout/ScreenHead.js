import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import layoutStyles from "../../styles/layout/layoutStyles"

class Layout extends React.Component {

    render() {

        const head =
            (
                <View style={layoutStyles.screenHead} class='screenTitleView'>
                    <Text style={layoutStyles.screenHeadTitle}>{this.props.screenTitleText}</Text>
                </View>
            )
        return (
            <SafeAreaView>{head}</SafeAreaView>
        )
    }
}
export default Layout