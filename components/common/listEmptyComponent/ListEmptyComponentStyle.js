import { StyleSheet } from 'react-native';
import colors from "../../../assets/colors"
var styles = StyleSheet.create({
    ListEmptyComponent: {
        marginTop: 50,
        alignItems: 'center'
    },
    ListEmptyComponentText: {
        fontWeight: 'bold',
        color: colors.textWhite
    }
});

module.exports = styles;