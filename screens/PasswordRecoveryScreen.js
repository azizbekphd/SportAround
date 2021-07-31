import React from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function PasswordRecoveryScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View>
                <Text style={globalStyles.title}>Восстановление пароля</Text>
            </View>
            <View style={styles.content}
                width="100%">
                <Text>Введите адрес электронной почты, мы вышлем на него новый пароль</Text>
                <View style={styles.inputs}
                    width="100%">
                    <Text>Введите Ваш E-mail или никнейм</Text>
                    <TextInput
                        width="100%"
                        style={[globalStyles.textInput, styles.input]}
                        keyboardType="email-address"
                        placeholder="example@site.com" />
                </View>
            </View>
            <TouchableOpacity
                style={globalStyles.button}
                activeOpacity={0.5}
            >
                <Text style={globalStyles.buttonText}>Продолжить</Text>
            </TouchableOpacity>
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