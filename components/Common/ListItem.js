import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from "../../assets/colors"
const ListItem = (item, children) => {
    return (
        <View style={{
            minHeight: 100, flexDirection: "row", backgroundColor: colors.listItemBg, alignItems: "center",
            marginVertical: 5
        }}>
            <View style={{ height: 70, width: 70, marginLeft: 10 }}>
                <Image source={require("../assets/icon.png")} style={{ flex: 1, height: null, width: null, borderRadius: 35 }}></Image>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                <Text style={{
                    fontWeight: 100,
                    fontSize: 22,
                    color: colors.textWhite
                }}>{item.name}</Text>
            </View>
            {children}
            {/* {item.read ?
                    <Ionicons name="ios-checkmart" color={colors.logoColor} size={30}></Ionicons> : (
                        <ActionButton onPress={() => this.markAsRead(item, index)} style={{ width: 100, backgroundColor: colors.bgSuccess }} >
                            <Text style={{ fontWeight: 'bold', color: "white" }}>Mark as read</Text>
                        </ActionButton>)} */}

        </View>
    );
}

export default ListItem;

const styles = StyleSheet.create({
    containerWrapper: {

        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})