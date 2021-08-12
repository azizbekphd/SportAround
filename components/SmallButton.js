import React from 'react';
import globalStyles from '../global/Styles';
import { TouchableOpacity, Text, Icon, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H3 from './H3';

export default function SmallButton(props) {
    return (
        <>
            {props.disabled ?
                <TouchableOpacity activeOpacity={1} width="100%" style={{ ...styles.container, backgroundColor: '#a2a6b4' }}>
                    <H3>{props.title}</H3>
                </TouchableOpacity>
                :
                props.outlined ?
                    (<TouchableOpacity width="100%" activeOpacity={0.5} style={{ ...styles.container, borderColor: '#6d61e7', borderWidth: 2, backgroundColor: "#fff" }} onPress={props.onPress}>
                        <H3 color="#6d61e7">{props.title}</H3>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity width="100%" activeOpacity={0.5} style={{ ...styles.container, paddingHorizontal: 0 }} onPress={props.onPress}>
                        <LinearGradient colors={['#6566fd', '#6843cf']} width="100%" height="100%" style={styles.container}>
                            <H3>{props.title}</H3>
                        </LinearGradient>
                    </TouchableOpacity>
                    )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 28,
        alignSelf: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        paddingHorizontal: 10
    }
})