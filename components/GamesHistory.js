import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image,
	ActivityIndicator,
} from "react-native";
import H3 from "../components/H3";
import { useNavigation } from "@react-navigation/native";
import SvgUri from "expo-svg-uri";
import SportIcon from "./SportIcon";
import H2 from "../components/H2";
import AuthContext from "../contexts/AuthContext";
import api from "../global/api";
import formatDate from "../global/formatDate";

export default function GamesHistory({ gamesInfo }) {
	const navigation = useNavigation();
	const ref = useRef();

	return (
		<>
			{gamesInfo && gamesInfo.length != 0 ? (
				<View width="100%" style={styles.container}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							height: 44,
							paddingLeft: 10,
							paddingRight: 20,
						}}
					>
						<H3 color="#000">Всего игр:</H3>
						<H3 color="#000" style={{ fontWeight: "700" }}>
							{gamesInfo ? gamesInfo.length : ""}
						</H3>
					</View>
					{gamesInfo.map((item, index, array) => {
						return (
							<View style={styles.item} key={item.id}>
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => {
										navigation.navigate("PastGameDetails", { game: item });
									}}
									width="100%"
									style={styles.itemContent}
								>
									<SportIcon sport={item.typeId} />
									<H3 color="#000" style={{ flex: 1, marginLeft: 10 }}>
										{formatDate(item.dateGame)}
									</H3>
									<SvgUri source={require("../assets/icons/right.svg")} />
								</TouchableOpacity>
								{index != array.length - 1 && (
									<View style={styles.separator} width="100%"></View>
								)}
							</View>
						);
					})}
				</View>
			) : (
				<View
					style={{
						flex: 1,
						alignSelf: "stretch",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					{gamesInfo === null ? (
						<ActivityIndicator color="#ffffff" />
					) : (
						<H2>История пуста</H2>
					)}
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		borderRadius: 10,
		paddingVertical: 12,
		paddingHorizontal: 15,
	},
	item: {
		height: 60,
		padding: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	itemContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	separator: {
		height: 1,
		backgroundColor: "#E5E5E5",
		position: "absolute",
		top: 59,
	},
	button: {
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "flex-start",
		width: 160,
	},
});
