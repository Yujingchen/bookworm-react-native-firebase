import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import NetworkImage from "react-native-image-progress"
import ProgressPie from "react-native-progress/Pie"
import styles from "./ListItemStyle"
import colors from "../../../assets/colors"
const image = require("../../../assets/icon.png")
const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
    return (
        <View style={[styles.container, { marginVertical }]}>
            <View style={styles.imageContainer}>
                <TouchableOpacity disabled={!editable} style={{ flex: 1 }} onPress={() => onPress(item)} >
                    {item.image ? <NetworkImage
                        source={{ uri: item.image }} style={styles.networkImage}
                        indicator={ProgressPie} indicatorProps=
                        {{
                            size: 40,
                            borderWidth: 0,
                            color: colors.logoColor,
                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                        }}
                        imageStyle={{ borderRadius: 35 }} /> :
                        <Image source={image} style={styles.image}></Image>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
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
