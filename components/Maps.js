import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

export default function Maps(props) {
    const [location, setLocation] = useState(null)

    useEffect(() => {

    }, [])

    return (
        <MapView style={styles.mapview}></MapView>
    )
}

const styles = StyleSheet.create({
    mapview: {
        zIndex: 1,
        position: 'absolute',
        top: StatusBar.currentHeight,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})