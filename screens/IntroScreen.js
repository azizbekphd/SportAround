import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function IntroScreen({ navigation }) {

    function handleStartButton() {
        navigation.replace("Authorization")
    }

    return (
        <View style={styles.container}>
            <Text>Вводная информация</Text>
            <TouchableOpacity
                activeOpacity={0.5}
                style={globalStyles.button}
                onPress={handleStartButton}
            >
                <Text style={globalStyles.buttonText}>Начать</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
})