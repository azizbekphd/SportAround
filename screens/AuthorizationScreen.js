import React, { useState, useContext } from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { View, StyleSheet } from 'react-native';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Toolbar from '../components/Toolbar';
import H1 from '../components/H1';
import Button from '../components/Button';
import AuthContext from '../contexts/AuthContext';
import validate, { validateAll } from '../global/validate';
import Loader from '../components/Loader';

export default function AuthorizationScreen({ navigation }) {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)

    const { signIn } = useContext(AuthContext)

    return (
        <View style={[globalStyles.container, { alignItems: 'stretch' }]} >
            <Toolbar back />
            <Loader
                loading={loading}
            />
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
                        valid={data.username ? validate("username", data.username) : null}
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
                        valid={data.password ? validate("password", data.password) : null}
                    />
                    <Link page="PasswordRecovery" title="Забыли пароль?" />
                </View>
                <Button title="Войти" onPress={() => {
                    setLoading(true)
                    signIn(data).then((_) => { setLoading(false) })
                }} disabled={
                    !validateAll(['username', 'password'], data)
                } />
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
