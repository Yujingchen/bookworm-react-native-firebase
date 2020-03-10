import React from 'react'
import { View, SafeAreaView, Text } from "react-native"
import layoutStyles from "../../styles/layout/layoutStyles"

class Layout extends React.Component {

    render() {
        <View style={layoutStyles.body}>
            <View class='screenTitle'>
                <Text style={layoutStyles.screenTitle}>Library</Text>
                {/* {this.props.title} */}
            </View>
            {this.props.children}
        </View>
    }
}
export default Layout