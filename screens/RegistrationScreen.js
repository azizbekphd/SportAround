import React from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import RequiredLabel from '../components/RequiredLabel';
import Toolbar from '../components/Toolbar';
import ViewPager from 'react-native-pager-view';
import H1 from '../components/H1';
import AnimatedTextInput from '../components/AnimatedTextInput';
import IconButton from '../components/IconButton';

export default function RegistrationScreen({ navigation }) {
    return (
        <View style={[globalStyles.container, { justifyContent: 'space-between' }]}>
            <Toolbar back />
            <ViewPager
                style={[styles.container, { padding: 20 }]}
                initialPage={0}
                layoutDirection="ltr"
                width="100%" height="100%"
            >
                <View key="1" style={styles.page} collapsable={false}>
                    <View style={{ width: 248 }}>
                        <H1>Новый{"\n"}
                            аккаунт</H1>
                    </View>
                    <View style={styles.inputs}>
                        <AnimatedTextInput
                            placeholder="Имя и фамилия"
                        />
                        <AnimatedTextInput
                            placeholder="E-mail"
                            keyboardType="email-address"
                        />
                        <AnimatedTextInput
                            placeholder="Пароль"
                            secureTextEntry={true}
                        />
                        <AnimatedTextInput
                            placeholder="Повторите пароль"
                            secureTextEntry={true}
                        />
                    </View>
                </View>
                <View key="2" style={styles.page} collapsable={false}>
                    <View style={{ width: 248 }}>
                        <H1>Вы почти{"\n"}
                            у цели
                        </H1>
                    </View>
                </View>
            </ViewPager>
            <IconButton onPress={() => { }}>
                <Image source={require('../assets/icons/arrow_r.png')} />
            </IconButton>
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
    page: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between'
    },
    inputs: {

    }
})