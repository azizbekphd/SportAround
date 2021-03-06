import React, { useState, useRef, useEffect } from "react";
import {
	View,
	TextInput,
	Animated,
	Text,
	StyleSheet,
	Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInputMask } from "react-native-masked-text";
import decodeDate from "../global/decodeDate.js";

export default function AnimatedTextInput({
	placeholder,
	valid,
	onFocus,
	mode,
	tel,
	mask,
	light,
	defaultValue,
	onChangeText,
	required,
	...others
}) {
	const floatAnim = useRef(new Animated.Value(defaultValue ? 0 : 20)).current;
	const fontSizeAnim = useRef(
		new Animated.Value(defaultValue ? 13 : 16)
	).current;
	const ref = useRef();
	const [focused, setFocused] = useState(false);
	const [value, setValue] = useState(defaultValue ?? "");
	const [modal, setModal] = useState(false);
	const [nativeValue, setNativeValue] = useState(
		mode == "date" || mode == "time"
			? defaultValue
				? new Date(decodeDate(defaultValue))
				: new Date()
			: null
	);

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	const getTheme = function () {
		return light ? "#000" : "#fff";
	};

	const getColor = function (valid) {
		return valid
			? "#29dec8"
			: valid === false
			? "#ff3333"
			: focused
			? getTheme()
			: value == ""
			? getTheme()
			: "#656b82";
	};

	const getPlaceholderColor = function (valid) {
		return valid === false
			? "#ff3333"
			: focused
			? getTheme()
			: value == ""
			? getTheme()
			: "#656b82";
	};

	const animate = function (ref, value) {
		Animated.timing(ref, {
			toValue: value,
			duration: 200,
			useNativeDriver: false,
		}).start();
	};

	const getNull = (number) => {
		return (number < 10 ? "0" : "") + number.toString();
	};

	return (
		<View style={styles.inputContainer}>
			<Animated.Text
				style={[
					styles.placeholder,
					{
						color: getPlaceholderColor(valid),
						top: floatAnim,
						fontSize: fontSizeAnim,
					},
				]}
			>
				{placeholder}
				<Text style={{ color: "#ff3333" }}>{required ? " *" : ""}</Text>
			</Animated.Text>
			{!(mask || tel) ? (
				<TextInput
					{...others}
					selectionColor="rgba(109, 97, 231, 0.5)"
					onFocus={(ev) => {
						setFocused(true);
						animate(floatAnim, 0);
						animate(fontSizeAnim, 13);
						if (mode == "date" || mode == "time") {
							setModal(true);
						} else {
							onFocus && onFocus(ev);
						}
					}}
					onBlur={() => {
						setFocused(false);
						if (!value || value.length == 0) {
							animate(floatAnim, 20);
							animate(fontSizeAnim, 16);
						}
					}}
					value={value}
					onChangeText={(value) => {
						if (mode == "date" || mode == "time") {
							setModal(true);
						} else {
							setValue(value);
							onChangeText && onChangeText(value);
						}
					}}
					style={{
						color: getTheme(),
						height: 50,
						borderBottomColor:
							getColor(valid) == getColor() && !focused
								? "#656b82"
								: getColor(valid),
						borderBottomWidth: focused ? 2 : 1,
						fontSize: 16,
						paddingHorizontal: 5,
						textAlignVertical: "bottom",
						paddingBottom: 6,
						paddingTop: 17,
					}}
					onPressIn={(e) => {
						e.target.onFocus(e);
					}}
				/>
			) : (
				<TextInputMask
					{...others}
					selectionColor="rgba(109, 97, 231, 0.5)"
					type={"custom"}
					options={{
						mask: mask ?? "+7 (999) 999 99 99",
					}}
					onFocus={(ev) => {
						setFocused(true);
						animate(floatAnim, 0);
						animate(fontSizeAnim, 13);
						onFocus && onFocus(ev);
					}}
					onBlur={() => {
						setFocused(false);
						if (!value || value.length == 0) {
							animate(floatAnim, 20);
							animate(fontSizeAnim, 16);
						}
					}}
					ref={ref}
					value={value}
					onChangeText={(value) => {
						setValue(value);
						let rawValue = ref.current.getRawValue();
						onChangeText && rawValue && onChangeText(value, rawValue);
					}}
					style={{
						color: getTheme(),
						height: 50,
						borderBottomColor:
							getColor(valid) == getColor() && !focused
								? "#656b82"
								: getColor(valid),
						borderBottomWidth: focused ? 2 : 1,
						fontSize: 16,
						paddingHorizontal: 5,
						textAlignVertical: "bottom",
						paddingBottom: 6,
						paddingTop: 17,
					}}
				/>
			)}
			{mode == "date" || mode == "time" ? (
				<DateTimePickerModal
					isVisible={modal}
					mode={mode}
					headerTextIOS="???????????????? ????????"
					onConfirm={(newDate) => {
						setNativeValue(newDate);
						let dateString =
							mode == "date"
								? `${getNull(newDate.getDate())}.${getNull(
										newDate.getMonth() + 1
								  )}.${newDate.getFullYear()}`
								: `${getNull(newDate.getHours())}:${getNull(
										newDate.getMinutes()
								  )}`;
						setValue(dateString);
						setModal(false);
						onChangeText && onChangeText(newDate, dateString);
					}}
					date={nativeValue}
					onCancel={() => {
						setModal(false);
					}}
				/>
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	inputContainer: {
		height: 68,
		justifyContent: "space-between",
	},
	placeholder: {
		position: "absolute",
	},
});
