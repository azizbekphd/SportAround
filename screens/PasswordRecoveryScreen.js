import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';

export default function PasswordRecoveryScreen({ navigation }) {
    return (
        <View style={[globalStyles.container, { alignItems: 'stretch' }]} >
            <Toolbar back title="Восстановление пароля" />
            <View style={[globalStyles.container, { alignItems: "stretch", padding: 20 }]}>
                <H3 style={{ textAlign: 'center' }}>Введите адрес электронной почты, мы вышлем вам новый пароль</H3>
                <AnimatedTextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                />
                <Button title="Отправить пароль" />
            </View>
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