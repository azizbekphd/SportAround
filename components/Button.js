import React from 'react';
import globalStyles from '../global/Styles';
import { TouchableOpacity, Text, Icon, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import H2 from './H2';

export default function Button(props) {
    return (
        /*<View style={{ height: 54, justifyContent: 'center', alignItems: 'center', borderRadius: 27 }}>
            {props.disabled ?
                <View style={{ backgroundColor: '#a2a6b4' }}>
                    <Text>{props.title}</Text>
                </View>
                :
                (props.outlined ?
                    <TouchableOpacity style={{ borderColor: '#6d61e7', borderWidth: 2, backgroundColor: "#fff" }}>
                        <Text style={{ ...globalStyles.h1, color: '#6d61e7' }}>{props.title}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity>
                        <LinearGradient colors={['#6566fd', '#6843cf']}>
                            <Text style={globalStyles.h1}>{props.title}</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                )
            }
        </View>*/
        <>
            {props.disabled ?
                <View width="100%" style={{ ...styles.container, backgroundColor: '#a2a6b4' }}>
                    <Text>{props.title}</Text>
                </View>
                :
                props.outlined ?
                    (<TouchableOpacity width="100%" activeOpacity={0.5} style={{ ...styles.container, borderColor: '#6d61e7', borderWidth: 2, backgroundColor: "#fff" }} onPress={props.onPress}>
                        <H2 color="#6d61e7">{props.title}</H2>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity width="100%" activeOpacity={0.5} style={styles.container} onPress={props.onPress}>
                        <LinearGradient colors={['#6566fd', '#6843cf']} width="100%" height="100%" style={styles.container}>
                            <H2>{props.title}</H2>
                        </LinearGradient>
                    </TouchableOpacity>
                    )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 54,
        alignSelf: "stretch",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27
    }
})