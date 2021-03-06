import React, { useContext, useEffect, useState } from "react";
import globalStyles from "../global/Styles";
import { View, StyleSheet } from "react-native";
import Toolbar from "../components/Toolbar";
import ModeSwitch from "../components/ModeSwitch";
import AnimatedTextInput from "../components/AnimatedTextInput";
import H3 from "../components/H3";
import Toggler from "../components/Toggler";
import Counter from "../components/Counter";
import Button from "../components/Button";
import AuthContext from "../contexts/AuthContext";
import decodeDate from "../global/decodeDate";
import formatDate from "../global/formatDate";
import getNull from "../global/getNull";
import H6 from "../components/H6";

export default function NewGameScreen({ route, navigation }) {
	const [isNewGame, setIsNewGame] = useState(true);
	const { getUser } = useContext(AuthContext);
	const [duration, setDuration] = useState(2);
	const [dateIsValid, setDateIsValid] = useState(null);
	const [timeIsValid, setTimeIsValid] = useState(null);
	const [gameData, setGameData] = useState({
		countPlays: route.params.countPlays,
		typeId: route.params.typeId,
		pay: 0,
		dateGame: "",
		startHour: null,
		startMin: 0,
		endHour: 0,
		endMin: 0,
	});
	const [searchParams, setSearchParams] = useState({
		expand: "user, playground",
		address: "",
		dateGameFirst: "",
		dateGameSecond: "",
		typeId: route.params.typeId,
		pay: 0,
	});

	function calculateAge(dob) {
		var diff_ms = Date.now() - dob.getTime();
		var age_dt = new Date(diff_ms);
		return Math.abs(age_dt.getUTCFullYear() - 1970);
	}

	useEffect(() => {
		setSearchParams((prev) => {
			return Object.fromEntries([
				...Object.entries(prev),
				...Object.entries(gameData).filter((e) => {
					return prev.hasOwnProperty(e[0]);
				}),
			]);
		});
		console.log(gameData);
	}, [gameData]);

	useEffect(() => {
		console.log(searchParams);
	}, [searchParams]);

	useEffect(() => {
		if (gameData.dateGame)
			setDateIsValid(
				gameData.dateGame
					? new Date(decodeDate(gameData.dateGame)) >=
							new Date(decodeDate(new Date()))
					: false
			);
		console.log(gameData.dateGame);
	}, [gameData.dateGame]);

	useEffect(() => {
		if (
			gameData.dateGame &&
			gameData.startHour !== null &&
			gameData.startMin !== null
		)
			setTimeIsValid(
				gameData.startHour !== null
					? gameData.startMin !== null
						? gameData.dateGame
							? new Date(
									`${decodeDate(gameData.dateGame)}T${getNull(
										gameData.startHour
									)}:${getNull(gameData.startMin)}:00.000Z`
							  ) >
							  new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
							: false
						: false
					: false
			);
	}, [gameData.dateGame, gameData.startHour, gameData.startMin]);

	useEffect(() => {
		let date = new Date(
			`${decodeDate(gameData.dateGame)}T${[
				gameData.startHour,
				gameData.startMin,
				0,
			]
				.map((a) => getNull(a))
				.join(":")}`
		);
		let dateS = new Date(date.setHours(date.getHours() - duration));
		let dateE = new Date(date.setHours(date.getHours() + duration));
		setSearchParams((prev) => {
			return {
				...prev,
				dateGameFirst: date
					? `${decodeDate(dateS)}T${[dateS.getHours(), dateS.getMinutes(), 0]
							.map((a) => getNull(a))
							.join(":")}`
					: "",
				dateGameSecond: date
					? `${decodeDate(dateE)}T${[dateE.getHours(), dateE.getMinutes(), 0]
							.map((a) => getNull(a))
							.join(":")}`
					: "",
			};
		});
	}, [duration, gameData.startHour, gameData.startMin]);

	return (
		<>
			<Toolbar back title="?????????? ????????" />
			<View
				style={[
					globalStyles.container,
					{
						padding: 20,
						justifyContent: "space-between",
						alignItems: "center",
					},
				]}
			>
				<View style={{ alignItems: "center" }}>
					<ModeSwitch
						onChange={(pos) => {
							setIsNewGame(pos == 0);
						}}
					/>
					<View
						width="100%"
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							...styles.item,
						}}
					>
						<View width="49%">
							<AnimatedTextInput
								required
								placeholder="????????"
								mode="date"
								valid={dateIsValid}
								onChangeText={(value, valueStr) => {
									setGameData((prev) => {
										return {
											...prev,
											dateGame: formatDate(value),
										};
									});
								}}
							/>
						</View>
						<View width="49%">
							<AnimatedTextInput
								required
								placeholder="??????????"
								mode="time"
								onChangeText={(value, valueStr) => {
									setGameData((prev) => {
										return {
											...prev,
											startHour: value.getHours(),
											startMin: value.getMinutes(),
											endHour: (value.getHours() + duration) % 24,
											endMin: value.getMinutes(),
										};
									});
								}}
								valid={timeIsValid}
							/>
						</View>
					</View>
					<View width="100%" style={styles.item}>
						<H3 style={{ marginBottom: 9 }}>?????? ????????????????:</H3>
						<Toggler
							items={
								getUser()
									? calculateAge(new Date(decodeDate(getUser().birthday))) >= 14
										? ["??????", "????????????????????", "??????????????"]
										: ["????????????????????"]
									: ["????????????????????"]
							}
							onChange={(index) => {
								console.log(index);
								setGameData((prev) => {
									return {
										...prev,
										pay: index != 0 ? index - 1 : null,
									};
								});
							}}
						/>
					</View>
					<View width="100%" style={styles.item}>
						<H3 style={{ marginBottom: 9 }}>
							{isNewGame ? "???????????????????????? ????????:" : "???????????????? ????????????:"}
						</H3>
						<Counter
							items={
								isNewGame
									? [
											{ t: "0 ??.", v: 0 },
											{ t: "1 ??.", v: 1 },
											{ t: "2 ??.", v: 2 },
											{ t: "3 ??.", v: 3 },
											{ t: "4 ??.", v: 4 },
											{ t: "5 ??.", v: 5 },
									  ]
									: [
											{ t: "0 ??.", v: 0 },
											{ t: "1 ??.", v: 1 },
											{ t: "2 ??.", v: 2 },
											{ t: "3 ??.", v: 3 },
											{ t: "4 ??.", v: 4 },
											{ t: "5 ??.", v: 5 },
											{ t: "1 ????????", v: 24 },
											{ t: "2 ??????", v: 48 },
											{ t: "3 ??????", v: 72 },
											{ t: "??????????", v: "" },
									  ]
							}
							onChange={(pos, v, t) => {
								setDuration(pos);
							}}
							default={duration}
						/>
					</View>
					{isNewGame ? (
						<View width="100%" style={styles.item}>
							<H3 style={{ marginBottom: 9 }}>?????? ??????????????:</H3>
							<Counter
								items={[
									{ t: "3x3", v: 6 },
									{ t: "4x4", v: 8 },
									{ t: "5x5", v: 10 },
									{ t: "6x6", v: 12 },
									{ t: "??????????", v: "" },
								]}
								onChange={(pos, v, t) => {
									setGameData((prev) => {
										return {
											...prev,
											countPlays: pos < 4 ? v : null,
										};
									});
								}}
								default={route.params.countPlays / 2 - 3}
							/>
						</View>
					) : (
						<H6 style={{ padding: 5 }}>
							*?????? ???????????? ???????????????? ????????????, ?????? ???????????? ???????? ?????????? ????????
						</H6>
					)}
				</View>
				<Button
					title={isNewGame ? "????????????" : "??????????"}
					onPress={() => {
						if (isNewGame) {
							navigation.navigate("PlaygroundChoice", {
								isNewGame: isNewGame,
								gameData: gameData,
							});
						} else {
							navigation.navigate("UsePlaygroundChoice", {
								isNewGame: isNewGame,
								gameData: gameData,
							});
						}
					}}
					disabled={
						!(
							gameData.dateGame !== null &&
							dateIsValid &&
							gameData.startHour !== null &&
							gameData.startMin !== null &&
							timeIsValid
						)
					}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	item: {
		marginTop: 20,
	},
});
