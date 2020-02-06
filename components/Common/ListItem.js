import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
import NetworkImage from "react-native-image-progress"
import ProgressPie from "react-native-progress/Pie"
const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
    return (
        <View style={[{
            minHeight: 100, flexDirection: "row", backgroundColor: colors.listItemBg, alignItems: "center",
            marginVertical: 5,
        }, { marginVertical }]}>
            <View style={{ height: 70, width: 70, marginLeft: 10 }}>
                <TouchableOpacity disabled={!editable} style={{ flex: 1 }} onPress={() => onPress(item)} >
                    {item.image ? <NetworkImage
                        source={{ uri: item.image }} style={{ flex: 1, height: null, width: null, borderRadius: 35 }}
                        indicator={ProgressPie} indicatorProps=
                        {{ size: 40, borderWidth: 0, color: colors.logoColor, unfilledColor: 'rgba(200, 200, 200, 0.2)' }}
                        imageStyle={{ borderRadius: 35 }}></NetworkImage> :
                        <Image source={require("../../assets/icon.png")} style={{ flex: 1, height: null, width: null, borderRadius: 35 }}></Image>
                    }
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <Text style={{
                    fontWeight: "100",
                    fontSize: 22,
                    color: colors.textWhite
                }}>
                    {item.name}
                </Text>
            </View>
            {children}
        </View >
    );
}

ListItem.defaultProps = {
    marginVertical: 5,
    editable: false
}

export default ListItem;

const styles = StyleSheet.create({
    containerWrapper: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})