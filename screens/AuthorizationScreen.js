import React, { useState, useContext } from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { View, StyleSheet } from 'react-native';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Toolbar from '../components/Toolbar';
import H1 from '../components/H1';
import Button from '../components/Button';
import AuthContext from '../api/AuthContext';

export default function RegistrationScreen({ navigation }) {
    const [data, setData] = useState({
        username: null,
        password: null,
    });

    const { signIn } = useContext(AuthContext)

    return (
        <View style={[globalStyles.container, { alignItems: 'stretch' }]} >
            <Toolbar back />
            <View style={[globalStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start', padding: 20 }]}>
                <View style={{ width: 248, marginTop: 82 }}>
                    <H1>Добро
                        пожаловать</H1>
                </View>
                <View width="100%">
                    <AnimatedTextInput
                        placeholder="Имя пользователя"
                        onChangeText={(value) => {
                            setData((prev) => {
                                return {
                                    ...prev,
                                    username: value
                                }
                            })
                        }}
                    />
                    <AnimatedTextInput
                        placeholder="Пароль"
                        secureTextEntry={true}
                        onChangeText={(value) => {
                            setData((prev) => {
                                return {
                                    ...prev,
                                    password: value
                                }
                            })
                        }}
                    />
                    <Link page="PasswordRecovery" title="Забыли пароль?" />
                </View>
                <Button title="Войти" onPress={() => {
                    signIn(data)
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 86,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    content: {
        padding: 20,
        justifyContent: 'space-evenly',
    },
})