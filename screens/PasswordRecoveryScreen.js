import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Toolbar from '../components/Toolbar';

export default function PasswordRecoveryScreen({ navigation }) {
    return (
        <View style={globalStyles.container}>
            <Toolbar back={true} title="Восстановление пароля" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    content: {
        height: 200,
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputs: {
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
    },
})