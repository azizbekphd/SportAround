import React from 'react';
import globalStyles from '../global/Styles';
import { TouchableOpacity, Text, Icon, View, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function IconButton(props) {
    return (
        <>
            {props.disabled ?
                <View style={{ ...styles.container, backgroundColor: '#a2a6b4' }}>
                    <Text>{props.title}</Text>
                </View>
                :
                props.outlined ?
                    (<TouchableOpacity activeOpacity={0.5} style={{ ...styles.container, borderColor: '#6d61e7', borderWidth: 2, backgroundColor: "#fff" }} onPress={props.onPress}>
                        {props.children}
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity activeOpacity={0.5} style={styles.container} onPress={props.onPress}>
                        <LinearGradient colors={['#6566fd', '#6843cf']} width="100%" height="100%" style={styles.container}>
                            {props.children}
                        </LinearGradient>
                    </TouchableOpacity>
                    )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 54,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27
    }
})