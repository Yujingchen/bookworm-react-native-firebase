import { StyleSheet } from 'react-native';
import colors from "../../assets/colors"
var styles = StyleSheet.create({
    swipeoutContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor: colors.bgMain,
    }
    ,
    swipeoutBtnContainer: {
        position: 'relative',
        paddingVertical: 20,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        elevation: 1000,
        flex: 1
    },
    swipeoutBtnText: { color: colors.textWhite },
    swipeoutIcon: {
        color: colors.logoColor
    }
})

module.exports = styles;