import React, { useState, useRef, useContext, useCallback } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, TextInput, Image, Alert, StatusBar, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toolbar from '../components/Toolbar';
import PagerView from 'react-native-pager-view';
import H1 from '../components/H1';
import H6 from '../components/H6';
import AnimatedTextInput from '../components/AnimatedTextInput';
import IconButton from '../components/IconButton';
import Button from '../components/Button';
import { LinearGradient } from 'expo-linear-gradient';
import Indicator from '../components/Indicator';
import AuthContext from '../contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Dropdown from '../components/Dropdown';
import validate, { validateAll } from '../global/validate';
import Loader from '../components/Loader';
import rawPhone from '../global/rawPhone';
import { useFocusEffect } from '@react-navigation/core';

export default function RegistrationScreen({ navigation }) {

    const [dob, setDob] = useState(null)
    const [loading, setLoading] = useState(false)
    const pager = useRef()
    const [page, setPage] = useState(0)
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        password_repeat: '',
        email: '',
        phone: '',
        birthday: '',
        gender: 0
    })

    const { signUp } = useContext(AuthContext)

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                if (page == 1) {
                    pager.current.setPage(0)
                    return true;
                } else {
                    return false;
                }
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [page])
    );

    const selectImage = async () => {
        console.log("start");
        let permission = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (permission.status == 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                setData((prev) => {
                    return {
                        ...prev,
                        imageUri: result.uri,
                    }
                })
            }
        } else {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            selectImage()
        }
        console.log("end");
    }

    return (
        <>
            <Toolbar back onBack={() => { page == 0 ? navigation.pop() : pager.current.setPage(0) }} />
            <Loader
                loading={loading}
            />
            <View style={[globalStyles.container, { justifyContent: 'space-between', alignItems: 'flex-start', overflow: 'visible' }]}>
                <View width="100%" style={styles.static}>
                    <View width="100%" style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Indicator index={page} count={[1, 2]} />
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { selectImage() }}
                        style={[styles.cameraButton, { top: 50 }]}>
                        <LinearGradient style={styles.cameraButton} width="100%" height="100%" colors={['rgba(41,222,200,1)', 'rgba(41,222,200,0)']}>
                            {data.imageUri ? <Image source={{ uri: data.imageUri }} resizeMode="cover" style={styles.cameraButton} /> : <Image source={require("../assets/icons/camera.png")} />}
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
                    scrollEnabled={page == 0 ? validateAll(['username', 'email', 'password', 'password_repeat'], data) : true}
                >
                    <View key="1" style={styles.page} collapsable={false}>
                        <View style={{ width: 248 }}>
                            <H1>Новый{"\n"}
                                аккаунт</H1>
                        </View>
                        <View style={styles.inputs}>
                            <AnimatedTextInput
                                placeholder="Имя пользователя"
                                autoCapitalize="none"
                                onChangeText={(value) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            username: value,
                                        }
                                    })
                                }}
                                valid={data.username && validate("username", data.username)}
                            />
                            <AnimatedTextInput
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={(value) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            email: value,
                                        }
                                    })
                                }}
                                valid={data.email && validate("email", data.email)}
                            />
                            <AnimatedTextInput
                                placeholder="Пароль"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                onChangeText={(value) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            password: value,
                                        }
                                    })
                                }}
                                valid={data.password && validate("password", data.password)}
                            />
                            <AnimatedTextInput
                                placeholder="Повторите пароль"
                                secureTextEntry={true}
                                autoCapitalize="none"
                                onChangeText={(value) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            password_repeat: value,
                                        }
                                    })
                                }}
                                valid={data.password_repeat ? data.password && validate("password", data.password) && data.password == data.password_repeat : null}
                            />
                            <IconButton onPress={() => { pager.current.setPage(1) }}
                                disabled={!(page == 0 ? validateAll(['username', 'email', 'password', 'password_repeat'], data) : true)}
                            >
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
                            <Dropdown
                                placeholder="Пол"
                                data={[
                                    { title: 'Мужской', id: 1 },
                                    { title: 'Женский', id: 2 },
                                ]}
                                onChange={(id, title) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            gender: id,
                                        }
                                    })
                                }}
                                valid={data.gender && validate("gender", data.gender)}
                            />
                            <AnimatedTextInput
                                placeholder="Телефон"
                                keyboardType="phone-pad"
                                tel
                                onChangeText={(value) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            phone: rawPhone(value),
                                        }
                                    })
                                }}
                                valid={data.phone && validate("phone", data.phone)}
                            />
                            <AnimatedTextInput
                                placeholder="Дата рождения"
                                mode="date"
                                onChangeText={(value, valueStr) => {
                                    setData((prev) => {
                                        return {
                                            ...prev,
                                            birthday: valueStr,
                                        }
                                    })
                                    setDob(value)
                                }}
                                valid={data.birthday ? dob && validate("birthday", dob) : null}
                            />
                            <View style={{ height: 68 }}>
                                <H6 color="rgba(255,255,255,.5)">Нажимая кнопку «Начать», вы соглашаетесь с политикой конфиденциальности</H6>
                            </View>
                            <Button title="Начать" onPress={() => {
                                setLoading(true)
                                signUp(data).then((_) => { setLoading(false) })
                            }} disabled={
                                !validateAll(
                                    ['username', 'email', 'password', 'password_repeat', 'gender', 'phone', 'birthday'],
                                    { ...data, birthday: dob }
                                )
                            } />
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
        borderRadius: 48,
        overflow: 'hidden'
    },
    static: {
        position: 'absolute',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        top: 120 - getStatusBarHeight(),
        paddingHorizontal: 20,
    },
    inputs: {
        backgroundColor: "#0E0938"
    }
})