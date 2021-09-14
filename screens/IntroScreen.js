import React, { useState, useRef } from 'react';
import globalStyles from '../global/Styles';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import IconButton from '../components/IconButton';
import Page from '../components/LoadingScreen/Page';
import H2 from '../components/H2';
import PagerView from 'react-native-pager-view';
import Button from '../components/Button';
import Indicator from '../components/Indicator';

export default function IntroScreen({ navigation }) {

    const [index, setIndex] = useState(0)
    const pager = useRef()

    function goToLastPage() {
        pager.current.setPage(2)
    }

    return (
        <>
            <PagerView initialPage={0}
                layoutDirection="ltr"
                style={styles.container}
                onPageSelected={(ev) => { setIndex(ev.nativeEvent.position) }}
                ref={pager}
            >
                <View key="1" collapsable={false} style={styles.page}>
                    <Page image={require("../assets/images/1a.jpg")}>
                        <H2>Объединяйтесь в команды и создавайте собственную игру или ищите для себя подходящую</H2>
                        <IconButton onPress={goToLastPage} >
                            <Image source={require("../assets/icons/arrow_r.png")} />
                        </IconButton>
                    </Page>
                </View>
                <View key="2" collapsable={false} style={styles.page}>
                    <Page image={require("../assets/images/4.png")}>
                        <H2>Подбирайте максимально удобный вариант площадки и бронируйте прямо в приложении Sport Around</H2>
                        <IconButton onPress={goToLastPage} >
                            <Image source={require("../assets/icons/arrow_r.png")} />
                        </IconButton>
                    </Page>
                </View>
                <View key="3" collapsable={false} style={styles.page}>
                    <Page image={require("../assets/images/3a.png")}>
                        <H2>Sport Around также напомнит, где и когда состоится ваша следующая по плану игра</H2>
                        <Button title="Начало" onPress={() => { navigation.replace("SignInSignUp") }} />
                    </Page>
                </View>
            </PagerView>
            <Indicator index={index} count={[0, 1, 2]} style={{
                position: 'absolute',
                bottom: 250,
                left: 20,
                justifyContent: "space-between"
            }} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    page: {
        flex: 1,
    }
})