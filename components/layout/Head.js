import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import layoutStyles from "../../styles/layout/layoutStyles"


class Head extends React.Component {
    headTitle = (
        <Text style={layoutStyles.screenHeadTitle}>{this.props.headTitle}</Text>
    )
    render() {
        return (
            <SafeAreaView>
                <View style={layoutStyles.screenHead} class='screen-head'>
                    {headTitle}
                    {this.props.children}
                </View>
            </SafeAreaView>
        )
    }
}
export default Head