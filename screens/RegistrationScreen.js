import React, { useState, useRef } from 'react';
import globalStyles from '../global/Styles';
import Link from '../components/Link';
import { Text, View, StyleSheet, TextInput, Image, Alert, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RequiredLabel from '../components/RequiredLabel';
import Toolbar from '../components/Toolbar';
import PagerView from 'react-native-pager-view';
import H1 from '../components/H1';
import H6 from '../components/H6';
import AnimatedTextInput from '../components/AnimatedTextInput';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import Indicator from '../components/Indicator'

export default function RegistrationScreen({ navigation }) {
    const pager = useRef()
    const [page, setPage] = useState(0)
    return (
        <>
            <Toolbar back />
            <View style={[globalStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start', overflow: 'visible' }]}>
                <View width="100%" style={styles.static}>
                    <View width="100%" style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Indicator index={page} count={[1, 2]} />
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { console.log("Blabla") }} style={[styles.cameraButton, { top: 50 }]}>
                        <LinearGradient style={styles.cameraButton} width="100%" height="100%" colors={['rgba(41,222,200,1)', 'rgba(41,222,200,0)']}>
                            <Image source={require('../assets/icons/camera.png')} />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <PagerView
                    style={styles.container}
                    initialPage={0}
                    layoutDirection="ltr"
                    width="100%" height="100%"
                    onPageSelected={(ev) => { setPage(ev.nativeEvent.position) }}
                    pageMargin={7}
                    ref={pager}
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
                            <IconButton onPress={() => { pager.current.setPage(1) }}>
                                <Image source={require('../assets/icons/arrow_r.png')} />
                            </IconButton>
                        </View>
                    </View>
                    <View key="2" style={styles.page} collapsable={false}>
                        <View style={{ width: 248 }}>
                            <H1>Вы почти{"\n"}
                                у цели
                            </H1>
                        </View>
                        <View style={styles.inputs}>
                            <AnimatedTextInput
                                placeholder="Телефон"
                                keyboardType="phone-pad"
                                tel
                            />
                            <AnimatedTextInput
                                placeholder="Дата рождения"
                                mode="date"
                            />
                            <AnimatedTextInput
                                placeholder="Адрес"
                            />
                            <View style={{ height: 68 }}>
                                <H6 color="rgba(255,255,255,.5)">Нажимая кнопку «Начать», вы соглашаетесь с политикой конфиденциальности</H6>
                            </View>
                            <Button title="Начать" onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'Main' }],
                                });
                            }} />
                        </View>
                    </View>
                </PagerView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'space-evenly',
    },
    page: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 20
    },
    cameraButton: {
        width: 96,
        height: 96,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48
    },
    static: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        top: 120 - StatusBar.currentHeight,
        paddingHorizontal: 20,
    },
    inputs: {
        backgroundColor: "#0E0938"
    }
})