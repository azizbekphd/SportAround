import React, { useState } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Toolbar from '../components/Toolbar';
import H3 from '../components/H3';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Button from '../components/Button';
import validate from '../global/validate';
import Loader from '../components/Loader';
import api from '../global/api';

export default function PasswordRecoveryScreen({ navigation }) {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)

    return (
        <View style={[globalStyles.container, { alignItems: 'stretch' }]} >
            <Toolbar back title="Восстановление пароля" />
            <Loader loading={loading} />
            <View style={[globalStyles.container, { alignItems: "stretch", padding: 20 }]}>
                <H3 style={{ textAlign: 'center' }}>Введите адрес электронной почты, мы вышлем вам новый пароль</H3>
                <AnimatedTextInput
                    placeholder="E-mail или имя пользователя"
                    keyboardType="email-address"
                    onChangeText={(value) => { setEmail(value) }}
                    valid={email ? !validate("email", email) ? validate("username", email) : true : null}
                />
                <Button title="Отправить пароль"
                    onPress={() => {
                        setLoading(true)
                        fetch(api + 'registration/recover', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body: JSON.stringify({ usernameEmail: email })
                        }).then((response) => {
                            setLoading(false)
                            if (response.ok) {
                                Alert.alert("Восстановление пароля", `Письмо с паролем отправлено на вашу почту`)
                            } else {
                                Alert.alert("Что-то пошло не так...", "Не удается осуществить запрос. Повторите правильность введенных данных и повторите попытку")
                            }
                        })
                    }}
                    disabled={email ? !(!validate("email", email) ? validate("username", email) : true) : true} />
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