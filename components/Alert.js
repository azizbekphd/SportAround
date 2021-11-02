import React, { useState } from "react";
import { View, Modal, Image, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import H3 from "./H3";

export default function Alert({ show, text, buttons }) {
	return (
		<Modal visible={show} animationType="fade" transparent={true}>
			<View style={styles.center}>
				<View style={styles.modal}>
					<BlurView intensity={120} tint="dark" style={styles.modalContent}>
						<H3 style={{ textAlign: "center" }}>{text}</H3>
					</BlurView>
					<View style={styles.modalControls}>
						{buttons.map((e) => (
							<TouchableOpacity
								key={e.text}
								onPress={() => {
									e.callback && e.callback(false);
								}}
								style={{
									flex: 1,
									alignSelf: "stretch",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<H3 color={e.color ?? "#9C4CED"}>{e.text}</H3>
							</TouchableOpacity>
						))}
					</View>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		marginHorizontal: 30,
		borderRadius: 10,
		minHeight: 150,
		alignSelf: "stretch",
		overflow: "hidden",
	},
	center: {
		...StyleSheet.absoluteFill,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,.5)",
	},
	modalContent: {
		flex: 1,
		alignSelf: "stretch",
		padding: 25,
	},
	modalControls: {
		backgroundColor: "#fff",
		flexDirection: "row",
		height: 54,
		alignSelf: "stretch",
		alignItems: "center",
		justifyContent: "space-around",
	},
});
