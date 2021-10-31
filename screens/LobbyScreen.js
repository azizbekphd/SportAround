import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Toolbar from "../components/Toolbar";
import { LinearGradient } from "expo-linear-gradient";
import H1 from "../components/H1";
import Countdown from "../components/Countdown";
import GameInfo from "../components/GameInfo";
import TeamInfo from "../components/TeamInfo";
import UsePlaygroundContext from "../contexts/UsePlaygroundContext";
import formatDate from "../global/formatDate";
import H2 from "../components/H2";
import getNull from "../global/getNull";

export default function LobbyScreen({ navigation, route }) {
	const [game, setGame] = useState({});
	const { getLobby } = useContext(UsePlaygroundContext);
	const [minutesLeft, setMinutesLeft] = useState(0);

	useEffect(() => {
		let interval = setInterval(() => {
			let lobby = getLobby();
			setGame(lobby);
			console.log(new Date());
			setMinutesLeft(
				Math.floor(
					(new Date(
						`${lobby.dateGame}T${getNull(lobby.startHour)}:${getNull(
							lobby.startMin
						)}:00.000Z`
					) -
						new Date()) /
						60000
				)
			);
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<>
			<LinearGradient
				colors={["#1D0B36", "#4E1470", "#0B1460", "#1C0A32"]}
				style={{ position: "absolute", ...StyleSheet.absoluteFill }}
			/>
			<Toolbar
				title="Информация о лобби"
				backgroundColor="rgba(0,0,0,0)"
				onReady={() => {}}
				readyText="Выход"
			/>
			{game ? (
				<ScrollView style={{ padding: 20, flex: 1 }}>
					<H1>До игры:</H1>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginVertical: 20,
						}}
					>
						<View width="48%">
							<Countdown value={Math.floor(minutesLeft / 60)} label="ч." />
						</View>
						<View width="48%">
							<Countdown value={Math.floor(minutesLeft % 60)} label="мин." />
						</View>
					</View>
					<GameInfo game={game} />
					<View style={{ height: 15 }} />
					<TeamInfo
						teamSize="3x3"
						isFree={false}
						playersInfo={[
							{
								id: "1",
								name: "Муминов Азизбек",
								phone: "+7 123 456 78 90",
								card: true,
							},
							{
								id: "2",
								name: "Джонни Депп",
								avatar: require("../assets/images/person.jpg"),
								phone: "+7 987 654 32 10",
							},
							{
								id: "3",
								name: "Николас Кейдж",
								phone: "+7 456 987 12 30",
								card: true,
							},
							{
								id: "4",
								name: "Джеки Чан",
								avatar: require("../assets/images/person.jpg"),
								phone: "+7 456 987 12 30",
								card: true,
							},
							{
								id: "5",
								name: "Александр Пушкин",
								avatar: require("../assets/images/person.jpg"),
								phone: "+7 456 987 12 30",
							},
							{
								id: "6",
								name: "Волан де Морт",
								phone: "+7 357 546 89 51",
							},
						]}
					/>
					<View style={{ height: 50 }} />
				</ScrollView>
			) : (
				<View
					style={{
						alignSelf: "stretch",
						flex: 1,
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<H2>Нет предстоящих игр</H2>
				</View>
			)}
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
