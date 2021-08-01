import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useFonts, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';

export default function H2(props) {
    let [fontLoaded] = useFonts({
        OpenSans_600SemiBold
    });

    /*if (!fontLoaded) {
        return <Text style={{
            fontSize: 18,
            color: props.color ?? '#fff'
        }}>Font</Text>
    } else {*/
    return (
        <Text style={[{
            fontSize: 18,
            color: props.color ?? '#fff'
        },
        fontLoaded ?? { fontFamily: 'OpenSans_600SemiBold' }]}>{props.children}</Text>
    )
}
