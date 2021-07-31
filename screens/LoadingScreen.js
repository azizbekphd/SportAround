import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingScreen({ navigation }) {

    const [connection, setNetworkState] = useState();

    useEffect(() => {
        setTimeout(() => {
            navigation.replace("Intro");
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.brand}>
                <Image
                    style={styles.logo}
                    source={require('../assets/images/logo.png')}
                />
                <Text style={styles.appName}>Sport Around</Text>
            </View>
            <ActivityIndicator size="large" color="#000000" />
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
