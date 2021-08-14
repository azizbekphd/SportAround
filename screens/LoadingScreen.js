import React, { useEffect, useState } from 'react';
import globalStyles from '../global/Styles';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import H1 from '../components/H1';
import { CommonActions } from '@react-navigation/routers';

export default function LoadingScreen({ navigation }) {

    const [connection, setNetworkState] = useState(true);
    const [progress, setProgress] = useState(1);

    useEffect(() => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://google.com");
        xhr.onload = function (ev) {
            console.log(xhr.response)
            navigation.replace("Intro")
        }
        xhr.onerror = function (ev) {
            setNetworkState(false)
        }
        xhr.onprogress = function (ev) {
            console.log(`${ev.loaded}/${ev.total}`)
            if (ev.lengthComputable)
                setProgress(ev.loaded / ev.total * 100)
            else setProgress(Infinity)
        }
        //xhr.send()
    }, [])

    useEffect(() => {
        if (progress >= 245) {
            navigation.navigate(
                "Main"
            )
        } else {
            setTimeout(() => {
                setProgress(progress + 1)
            });
        }
    }, [progress])

    return (
        <View style={globalStyles.container}>
            {connection ?
                <><View style={styles.brand}>
                    <H1>Sport Around</H1>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/logo.png')}
                    />
                </View>
                    <ProgressBar progress={progress} /></> : <Text></Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    brand: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logo: {
        maxWidth: 200,
        maxHeight: 200,
    }
});
