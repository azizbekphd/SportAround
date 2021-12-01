import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import H3 from "./H3";

export default function Toggler(props) {
	const [pos, setPos] = useState(0);

	return (
		<View width="100%" style={styles.container}>
			{props.items.map((el, index, arr) => {
				return (
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => {
							setPos(index);
							props.onChange && props.onChange(index);
						}}
						key={el}
						style={[
							styles.item,
							index == 0 ? styles.first : {},
							index == arr.length - 1 ? styles.last : {},
							{
								borderColor: pos == index ? "#29dec8" : "#656B82",
								borderWidth: pos == index ? 2 : 1,
							},
						]}
					>
						<H3 color={pos == index ? "#29dec8" : "#656B82"}>{el}</H3>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	item: {
		height: 40,
		borderWidth: 1,
		borderColor: "#656B82",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	first: {
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
	},
	last: {
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
	},
});
