import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Animated, Text, StyleSheet, Alert, Image, TouchableOpacity, FlatList, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import H3 from "./H3";

export default function Dropdown({
    placeholder,
    valid,
    onChange,
    data,
    initial,
    initialValue,
    ...others
}) {
    const resizeAnim = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(90)).current;
    const [selectedId, setSelectedId] = useState(initial ?? null);
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState(initialValue ?? null);

    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                (!value ? "#fff" :
                    (opened ? "#fff" : "#656b82")))
    }

    useEffect(() => {
        if (!opened) {
            Animated.timing(rotateAnim, {
                toValue: 90,
                duration: 150,
                useNativeDriver: false
            }).start()
            Animated.timing(resizeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: false
            }).start()
        } else {
            Animated.timing(rotateAnim, {
                toValue: 270,
                duration: 150,
                useNativeDriver: false
            }).start()
            Animated.timing(resizeAnim, {
                toValue: data.length * 40,
                duration: 150,
                useNativeDriver: false
            }).start()
        }
    }, [opened])

    const spin = rotateAnim.interpolate({
        inputRange: [90, 270],
        outputRange: ['90deg', '270deg']
    })

    return (
        <Animated.View style={{ minHeight: 68, maxHeight: data.length * 68, zIndex: 4000 }}>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                    setOpened(!opened)
                }}
            >
                <Text style={[
                    styles.placeholder,
                    {
                        color: getColor(valid),
                        top: value ? 0 : 20,
                        fontSize: value ? 13 : 16
                    }]}>{placeholder}</Text>
                <H3
                    style={{
                        color: "#fff",
                        height: 50,
                        fontSize: 16,
                        paddingHorizontal: 5,
                        textAlignVertical: "bottom",
                        paddingBottom: 6,
                        paddingTop: 22
                    }}
                >{value}</H3>
                <View style={{
                    height:1,
                    backgroundColor:getColor(valid) == "#fff" ? "#656b82" : getColor(valid)
                }}/>
                <Animated.Image
                    source={require('../assets/icons/arrow_r_purple.png')}
                    style={[
                        styles.icon,
                        { transform: [{ rotate: spin }] }
                    ]}
                />
            </TouchableOpacity>
            <Animated.View width="100%" style={{
                height: resizeAnim,
                maxHeight: (data.length + 1) * 68,
                overflow: "hidden",
                backgroundColor: "#0E0938",
            }}>
                {data.map((item) => {
                    return <View key={item.id} width="100%">
                        <TouchableOpacity
                            width="100%"
                            height="100%"
                            activeOpacity={0.5}
                            onPress={() => {
                                setSelectedId(item.id);
                                setValue(item.title);
                                setOpened(false);
                                onChange(item.id, item.title);
                            }}
                        >
                            {item.id == selectedId ?
                                <LinearGradient
                                    width="100%" height="100%"
                                    style={styles.item}
                                    colors={["rgba(38, 34, 84, 1)", "rgba(38, 34, 84, 0)"]}
                                >
                                    <H3>{item.title}</H3>
                                </LinearGradient> :
                                <View
                                    style={styles.item}>
                                    <H3>{item.title}</H3>
                                </View>
                            }
                        </TouchableOpacity>
                    </View>
                })}
            </Animated.View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    placeholder: {
        position: 'absolute'
    },
    icon: {
        position: "absolute",
        right: 3,
        top: 25,
    },
    item: {
        height: 40,
        paddingHorizontal: 16,
        alignItems: 'flex-start',
        justifyContent: 'center',
        zIndex: 500,
    }
})