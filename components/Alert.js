import React, { useState } from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import H3 from './H3';

export default function Alert(props) {
    return (
        <Modal
            visible={props.show}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.center}>
                <View style={styles.modal}>
                    <BlurView
                        intensity={120}
                        tint="dark"
                        style={styles.modalContent}
                    >
                        <H3></H3>
                    </BlurView>
                    <View style={styles.modalControls}>
                        <TouchableOpacity onPress={() => {
                            props.buttonCallback && props.buttonCallback(false)
                        }}>
                            <H3 color="#9C4CED">{props.buttonText}</H3>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        height: 100,
        marginHorizontal: 30,
        borderRadius: 10,
        alignSelf: "stretch",
        overflow: "hidden"
    },
    center: {
        alignSelf: "stretch",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.5)"
    },
    modalContent: {
        flex: 1,
        alignSelf: "stretch",
        padding: 25
    },
    modalControls: {
        backgroundColor: "#fff",
        flexDirection: "row",
        height: 54,
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "space-around"
    }
})