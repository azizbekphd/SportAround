import React from 'react';
import { ImageBackground, View } from 'react-native';
import globalStyles from '../../global/Styles'

export default function Page(props) {
    return (
        <View style={{ flex: 1 }} height="100%" collapsable={true}>
            <ImageBackground source={props.image} resizeMode="cover" width="100%" height="100%" style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-start' }}>
                <View style={{ margin: 20, justifyContent: 'space-around', height: 185 }}>
                    {props.children}
                </View>
            </ImageBackground>
        </View>
    )
}