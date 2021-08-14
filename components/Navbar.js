import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native';
import SvgUri from 'expo-svg-uri';
import H3 from './H3';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default function Navbar({ state, descriptors, navigation }) {

    const icons = [require('../assets/icons/timer.svg'),
    require('../assets/icons/date.svg'),
    require('../assets/icons/add.svg'),
    require('../assets/icons/favourite.svg'),
    require('../assets/icons/profile.svg')]

    return (
        <View width="100%" style={{
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            zIndex: 1000,
            backgroundColor: "#0A0729"
        }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        key={label}
                    >
                        <SvgUri source={icons[index]} fill={isFocused ? "#ffffff" : "rgba(255,255,255,0.5)"} />
                    </TouchableOpacity>
                );
                {/*return <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                        props.setPageIndex(index)
                    }}
                    activeOpacity={0.5}
                >
                    <SvgUri source={item.icon} fill={props.pageIndex != index ? "#656B82" : "#fff"} />
                </TouchableOpacity>*/}
            })}
        </View >
    )
}