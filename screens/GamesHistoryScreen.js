import React, { useRef, useState, useContext, useEffect } from "react";
import globalStyles from "../global/Styles";
import { View, StyleSheet, ScrollView } from "react-native";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import GamesHistory from "../components/GamesHistory";
import AuthContext from "../contexts/AuthContext";
import UsePlaygroundContext from "../contexts/UsePlaygroundContext";

export default function GamesHistoryScreen({ navigation, route }) {
	const ref = useRef();
	const [gamesInfo, setGamesInfo] = useState(null);
	const { getToken } = useContext(AuthContext);
	const { getHistory } = useContext(UsePlaygroundContext);

	useEffect(() => {
		// fetch(api + "use-playground/my", {
		// 	method: "GET",
		// 	headers: {
		// 		Authorization: `Bearer ${getToken()}`,
		// 	},
		// })
		// 	.then(async (response) => {
		// 		if (response.status == 200) {
		// 			responseObj = await response.json();
		// 			console.log(responseObj);
		// 		}
		// 		setGamesInfo(responseObj);
		// 	})
		// 	.catch((reason) => {});
		console.log(getHistory());
		setGamesInfo(getHistory());
	}, []);

	return (
		<>
			<Toolbar title="История игр" onMenu={() => {}} />
			<View
				style={[
					globalStyles.container,
					{ justifyContent: "flex-start", paddingTop: 20, flex: 1 },
				]}
			>
				<View style={{ paddingHorizontal: 20 }}>
					<Searchbar ref={ref} onChangeText={() => {}} />
				</View>
				<View style={{ height: 16 }} />
				<ScrollView width="100%" style={{ paddingHorizontal: 20, flex: 1 }}>
					<GamesHistory gamesInfo={gamesInfo} />
					<View style={{ height: 30 }} />
				</ScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	sport: {
		height: 148,
		width: 160,
		borderRadius: 10,
	},
});
