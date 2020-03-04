import { StyleSheet } from 'react-native';
import colors from "../../assets/colors"
var styles = StyleSheet.create({
    inputFieldContainer: {
        height: 50,
        flexDirection: "row",
    },
    textBox: {
        backgroundColor: '#dcdcdc',
        color: '#121212',
        flex: 1,
        padding: 5,
    }, inputField: {
        backgroundColor: "transparent",
        color: colors.textWhite,
        borderColor: colors.listItemBg,
        flex: 1,
        padding: 5,
        fontSize: 22,
        fontWeight: "200",
    }
})

module.exports = styles;