import React from 'react';
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native';
import globalStyles from '../global/Styles';

export default function LoaderScreen() {
    return (
        <View style={globalStyles.container}>
            <View style={styles.brand}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo.png')}
                />
            </View>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    brand: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        maxWidth: 200,
        maxHeight: 200,
    }
});