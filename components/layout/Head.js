import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import HeadStyles from "./HeadStyles"
import PropTypes from 'prop-types'

class Head extends React.Component {
    render() {
        const { title, ...props } = this.props
        if (title != undefined) {
            var headTitle = (
                <Text style={HeadStyles.title}>{title}</Text>
            )
            return (
                <SafeAreaView>
                    <View style={HeadStyles.head} class='screen-head'>
                        {headTitle}
                        {this.props.children}
                    </View>
                </SafeAreaView>
            )
        }
        return (
            <SafeAreaView>
                <View>
                    {this.props.children}
                </View>
            </SafeAreaView>
        )
    }
}

Head.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Head