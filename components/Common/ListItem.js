import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
    return (
        <View style={[{
            minHeight: 100, flexDirection: "row", backgroundColor: colors.listItemBg, alignItems: "center",
            marginVertical: 5,
        }, { marginVertical }]}>
            <View style={{ height: 70, width: 70, marginLeft: 10 }}>
                <TouchableOpacity disabled={!editable} style={{ flex: 1 }} onPress={() => onPress(item)} >
                    <Image source={require("../../assets/icon.png")} style={{ flex: 1, height: null, width: null, borderRadius: 35 }}></Image>
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