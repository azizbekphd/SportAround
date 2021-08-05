import React, { useState, useRef } from "react";
import { View, TextInput, Animated, Text, StyleSheet, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from "react-native-masked-text";

export default function AnimatedTextInput({
    placeholder,
    valid,
    onFocus,
    mode,
    tel,
    ...others
}) {
    const floatAnim = useRef(new Animated.Value(20)).current;
    const fontSizeAnim = useRef(new Animated.Value(16)).current;
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState("");
    const [modal, setModal] = useState(false);
    const [nativeValue, setNativeValue] = useState(new Date());

    const getColor = function (valid) {
        return valid ? "#29dec8" :
            (valid === false ? "#ff3333" :
                (focused ? "#fff" :
                    (value == "" ? "#fff" : "#656b82")))
    }

    const animate = function (ref, value) {
        Animated.timing(ref, {
            toValue: value,
            duration: 200,
            useNativeDriver: false
        }).start();
    }

    const getNull = (number) => {
        return ((number < 10 ? "0" : "") + number.toString())
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
            {!tel ? <TextInput
                {...others}
                onFocus={(ev) => {
                    setFocused(true);
                    animate(floatAnim, 0)
                    animate(fontSizeAnim, 13)
                    if (mode == "date" || mode == "time") {
                        setModal(true)
                    } else {
                        onFocus && onFocus(ev);
                    }
                }}
                onBlur={() => {
                    setFocused(false);
                    if (value.length == 0) {
                        animate(floatAnim, 20)
                        animate(fontSizeAnim, 16)
                    }
                }}
                value={value}
                onChangeText={(value) => { if (mode == "date" || mode == "time") { setModal(true) } else { setValue(value) } }}
                style={{
                    color: "#fff",
                    height: 50,
                    borderBottomColor: (getColor(valid) == "#fff" && !focused) ? "#656b82" : getColor(valid),
                    borderBottomWidth: focused ? 2 : 1,
                    fontSize: 16,
                    paddingHorizontal: 5,
                    textAlignVertical: "bottom",
                    paddingBottom: 6
                }}
            /> :
                <TextInputMask
                    {...others}
                    type={'custom'}
                    options={{
                        mask: '+7 (999) 999 99 99'
                    }}
                    onFocus={(ev) => {
                        setFocused(true);
                        animate(floatAnim, 0)
                        animate(fontSizeAnim, 13)
                        if (mode == "date" || mode == "time") {
                            setModal(true)
                        } else {
                            onFocus && onFocus(ev);
                        }
                    }}
                    onBlur={() => {
                        setFocused(false);
                        if (value.length == 0) {
                            animate(floatAnim, 20)
                            animate(fontSizeAnim, 16)
                        }
                    }}
                    value={value}
                    onChangeText={(value) => { if (mode == "date" || mode == "time") { setModal(true) } else { setValue(value) } }}
                    style={{
                        color: "#fff",
                        height: 50,
                        borderBottomColor: (getColor(valid) == "#fff" && !focused) ? "#656b82" : getColor(valid),
                        borderBottomWidth: focused ? 2 : 1,
                        fontSize: 16,
                        paddingHorizontal: 5,
                        textAlignVertical: "bottom",
                        paddingBottom: 6
                    }}
                />}
            <DateTimePickerModal
                isVisible={modal}
                mode={mode}
                headerTextIOS="Выберите дату"
                isDarkModeEnabled={true}
                onConfirm={(newDate) => {
                    setNativeValue(newDate)
                    setValue(
                        (mode == "date") ?
                            `${getNull(newDate.getDate())}.${getNull(newDate.getMonth())}.${newDate.getFullYear()}` :
                            `${getNull(newDate.getHours())}:${getNull(newDate.getMinutes())}`);
                    setModal(false)
                }}
                date={nativeValue}
                onCancel={() => { setModal(false) }}
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
    },
})