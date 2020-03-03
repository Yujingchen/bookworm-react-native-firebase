import { StyleSheet } from 'react-native';
import colors from "../assets/colors"
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  containerWrapper: {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBarContainer: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    flexDirection: "row"
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#123456',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  contentContainer: {
    flex: 1,
  },
  warningMessage: {
    marginTop: 50,
    alignItems: 'center'
  },

  inputField: {
    backgroundColor: "transparent",
    color: colors.textWhite,
    borderColor: colors.listItemBg,
    flex: 1,
    padding: 5,
    fontSize: 22,
    fontWeight: "200",
  }
});

module.exports = styles;