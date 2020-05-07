import { StyleSheet } from 'react-native';
import colors from "../../../assets/colors"
var styles = StyleSheet.create({
    container: {
        minHeight: 100,
        flexDirection: "row",
        backgroundColor: colors.listItemBg,
        alignItems: "center",
        marginVertical: 5,
    },
    imageContainer: {
        height: 70,
        width: 70,
        marginLeft: 10,
    },
    containerWrapper: {
        height: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    networkImage: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 35,
    },
    image: {
        flex: 1,
        height: null,
        width: null,
        borderRadius: 35,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 5,
    },
    text: {
        fontWeight: "100",
        fontSize: 15,
        color: colors.textWhite,
    }
});

module.exports = styles;