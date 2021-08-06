import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, Dimensions, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

export default function Maps(props) {
    const [location, setLocation] = useState(null)

    useEffect(() => {

    }, [])

    return (
        <ScrollView style={{
            ...styles.mapview,
            position: 'absolute',
            top: StatusBar.currentHeight,
        }}>
            <MapView
                style={styles.mapview}
            ></MapView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mapview: {
        zIndex: 500,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    }
})