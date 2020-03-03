import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from "prop-types"
import styles from "./FooterStyle"
const Footer = ({ loadingMore }) => {
    if (!loadingMore) {
        return null;
    }

    return (
        <View
            style={styles.footer}
        >
            <ActivityIndicator animating size="large" />
        </View>
    );
}


Footer.propTypes = {
    loadingMore: PropTypes.bool.isRequired,
}
Footer.defaultProps = {
    loadingMore: false
}
export default Footer;