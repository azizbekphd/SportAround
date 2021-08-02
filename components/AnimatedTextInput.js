import React, { useState, useRef } from "react";
import { View, TextInput, Animated, Text, StyleSheet } from "react-native";

export default function AnimatedTextInput({
    placeholder,
    valid,
    onFocus,
    ...others
}) {
    const floatAnim = useRef(new Animated.Value(20)).current;
    const fontSizeAnim = useRef(new Animated.Value(16)).current;
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");

    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                (focused ? "#fff" : "#656b82"))
    }

    const animate = function (ref, value) {
        Animated.timing(ref, {
            toValue: value,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    return (
        <View style={styles.inputContainer}>
            <Animated.Text style={[
                styles.placeholder,
                {
                    color: getColor(valid),
                    top: floatAnim,
                    fontSize: fontSizeAnim
                }]}>{placeholder}</Animated.Text>
            <TextInput
                {...others}
                onFocus={(ev) => {
                    setFocused(true);
                    animate(floatAnim, 0)
                    animate(fontSizeAnim, 13)
                    onFocus && onFocus(ev);
                }}
                onBlur={() => {
                    setFocused(false);
                    if (value.length == 0) {
                        animate(floatAnim, 20)
                        animate(fontSizeAnim, 16)
                    }
                }}
                value={value}
                onChangeText={(value) => { setValue(value) }}
                style={{
                    color: "#fff",
                    height: 50,
                    borderBottomColor: getColor(valid),
                    borderBottomWidth: focused ? 2 : 1,
                    fontSize: 16,
                    paddingHorizontal: 5,
                    textAlignVertical: "bottom",
                    paddingBottom: 6
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        height: 68,
        justifyContent: "space-between"
    },
    placeholder: {
        position: 'absolute'
    }
})