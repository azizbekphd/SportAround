import React, { useState } from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import AnimatedTextInput from '../components/AnimatedTextInput';
import Toolbar from '../components/Toolbar';
import H1 from '../components/H1';
import Button from '../components/Button';

export default function RegistrationScreen({ navigation }) {


    const [isValid, setIsValid] = useState(true);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <View style={[globalStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start', padding: 20 }]}>
            <Toolbar back={true} />
            <View style={{ width: 248, marginTop: 82 }}>
                <H1>Добро
                    пожаловать</H1>
            </View>
            <View width="100%">
                <AnimatedTextInput
                    placeholder="E-mail"
                    keyboardType="email-address"
                />
                <AnimatedTextInput
                    placeholder="Password"
                    secureTextEntry={true}

                    keyboardType="visible-password"
                />
                <Link page="PasswordRecovery" title="Забыли пароль?" />
            </View>
            <Button title="Войти" onPress={() => { }} />
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