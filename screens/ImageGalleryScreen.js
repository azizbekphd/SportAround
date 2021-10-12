import React from 'react';
import Toolbar from "../components/Toolbar";
import Gallery from "react-native-image-gallery";
import { View, StyleSheet } from "react-native";

export default function ImageGalleryScreen({navigation, route}){
    return (
        <View
            style={styles.container}
        >
            <Toolbar back title=""/>
            <Gallery
                style={styles.container}
                images={route.params.images}
                useNativeDriver={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#0E0938",
    }
})