import React, { useEffect } from "react";
import { Text } from "react-native";
import { useFonts, OpenSans_400Regular } from "@expo-google-fonts/open-sans";

export default function H7(props) {
	let [fontLoaded] = useFonts({
		OpenSans_400Regular,
	});

	/*if (!fontLoaded) {
        return <Text style={{
            fontSize: 18,
            color: props.color ?? '#fff'
        }}>Font</Text>
    } else {*/
	return (
		<Text
			style={[
				{
					fontSize: 12,
					color: props.color ?? "#fff",
				},
				fontLoaded ? { fontFamily: "OpenSans_400Regular" } : {},
				props.style,
			]}
		>
			{props.children}
		</Text>
	);
}
