import React, { useState, useRef, useContext, useEffect } from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Image,
	Switch,
	Alert,
} from "react-native";
import AnimatedTextInput from "../components/AnimatedTextInput";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import H3 from "../components/H3";
import NextRouteInput from "../components/NextRouteInput";
import Toolbar from "../components/Toolbar";
import globalStyles from "../global/Styles";
import PagerView from "react-native-pager-view";
import Indicator from "../components/Indicator";
import H2 from "../components/H2";
import api from "../global/api";
import AuthContext from "../contexts/AuthContext";
import Loader from "../components/Loader";

export default function AddPlaygroundScreen({ navigation, route }) {
	const [playgroundData, setPlaygroundData] = useState({
		typeId: route.params.typeId,
		latitude: route.params.location.coords.latitude,
		longitude: route.params.location.coords.longitude,
		address: route.params.address,
		name: "",
		coverage: "",
		costHour: 0,
		pay: 0,
		countPlays: 0,
	});
	const [schedule, setSchedule] = useState({
		startHour: null,
		startMin: null,
		endHour: null,
		endMin: null,
	});
	const usePlayground = route.params.usePlayground;
	const [index, setIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [tfs, setTfs] = useState(true);
	const pager = useRef();

	const { getToken } = useContext(AuthContext);

	const smthWentWrong = () => {
		Alert.alert("Ошибка", "Проверьте подключение и повторите попытку");
	};

	const scheduleIsValid = () => {
		if (
			schedule.startHour !== null &&
			schedule.startMin !== null &&
			schedule.endHour !== null &&
			schedule.endMin !== null
		) {
			return (
				schedule.startHour * 60 + schedule.startMin <
					schedule.endHour * 60 + schedule.endMin ||
				schedule.endMin + schedule.endHour == 0
			);
		}
		return null;
	};

	useEffect(() => {
		console.log(playgroundData);
	}, [playgroundData]);

	useEffect(() => {
		setPlaygroundData((prev) => {
			return {
				...prev,
				pay: playgroundData.costHour == 0 ? 0 : 1,
			};
		});
	}, [playgroundData.costHour]);

	useEffect(() => {
		console.log(schedule);
	}, [schedule]);

	return (
		<>
			<Toolbar
				back
				title="Добавить площадку"
				onBack={() => {
					if (index > 0) {
						pager.current.setPage(index - 1);
						setIndex((prev) => prev - 1);
					} else {
						navigation.pop();
					}
				}}
			/>
			<View
				style={{
					flex: 1,
					alignSelf: "stretch",
					backgroundColor: globalStyles.container.backgroundColor,
				}}
			>
				<PagerView
					initialPage={0}
					layoutDirection="ltr"
					style={globalStyles.container}
					onPageSelected={(ev) => {
						setIndex(ev.nativeEvent.position);
					}}
					ref={pager}
					scrollEnabled={false}
				>
					<View
						height="100%"
						style={{ ...globalStyles.container, paddingTop: 20 }}
						key="1"
						collapsable={false}
					>
						<ScrollView
							width="100%"
							height="100%"
							style={{ flex: 1, paddingHorizontal: 20 }}
						>
							<AnimatedTextInput
								placeholder="Название площадки"
								defaultValue={playgroundData.name}
								required
								onChangeText={(s) => {
									setPlaygroundData((prev) => {
										return {
											...prev,
											name: s,
										};
									});
								}}
								valid={playgroundData.name}
							/>
							<AnimatedTextInput
								placeholder="Адрес площадки"
								onChangeText={(s) => {
									setPlaygroundData((prev) => {
										return {
											...prev,
											address: s,
										};
									});
								}}
								defaultValue={playgroundData.address}
								valid={playgroundData.address}
								required
							/>
							{/* <AnimatedTextInput
							placeholder="Телефон"
							keyboardType="phone-pad"
							tel
							onChangeText={console.log}
						/> */}
							<AnimatedTextInput
								placeholder="Стоимость за час"
								defaultValue={`${playgroundData.costHour ?? 0}`}
								keyboardType="decimal-pad"
								onChangeText={(s) => {
									setPlaygroundData((prev) => {
										return {
											...prev,
											costHour: s.replace(/[^0-9]/g, "") * 1 ?? 0,
										};
									});
								}}
							/>
							{/* <Dropdown
							placeholder="Способ оплаты"
							data={[
								{ title: "Онлайн", id: "online" },
								{ title: "Офлайн", id: "offline" },
								{ title: "Онлайн/офлайн", id: "both" }
							]}
							onChange={(a, b) => console.log(a, b)}
						/> */}
							<AnimatedTextInput
								placeholder="Покрытие"
								onChangeText={(s) => {
									setPlaygroundData((prev) => {
										return {
											...prev,
											coverage: s,
										};
									});
								}}
								defaultValue={playgroundData.coverage}
								valid={playgroundData.coverage}
								required
							/>
							{/* <AnimatedTextInput
							placeholder="Вид спорта"
							onChangeText={console.log}
						/> */}
						</ScrollView>
						<View
							width="100%"
							style={{ paddingTop: 20, paddingHorizontal: 20 }}
						>
							{/* <TouchableOpacity
							width="100%"
							activeOpacity={0.5}
							style={{
								borderRadius: 10,
								borderColor: "#656B82",
								borderWidth: 1,
								paddingLeft: 30,
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
								height: 54,
								marginBottom: 20,
							}}
						>
							<H3 color="#6D61E7">Добавить фотографии</H3>
							<Image
								source={require("../assets/icons/add_photo_purple.png")}
								style={{ marginLeft: 8 }}
							/>
						</TouchableOpacity> */}
							<Button
								title="Дальше"
								disabled={
									!(
										playgroundData.name &&
										playgroundData.address &&
										playgroundData.coverage
									)
								}
								onPress={() => {
									setIsLoading(true);
									fetch(
										api +
											`playground${
												playgroundData.id ? "/" + playgroundData.id : ""
											}`,
										{
											method: playgroundData.id ? "PUT" : "POST",
											headers: {
												accept: "application/json",
												"Content-Type": "application/json",
												Authorization: `Bearer ${getToken()}`,
											},
											body: JSON.stringify(playgroundData),
										}
									)
										.then(async (resp) => {
											if (resp && resp.status == 200) {
												setPlaygroundData(await resp.json());
												setIndex(1);
												pager.current.setPage(1);
											} else {
												console.log(resp.status);
												console.log(await resp.text());
												smthWentWrong();
											}
										})
										.finally(() => {
											setIsLoading(false);
										});
								}}
							/>
						</View>
					</View>
					<View
						style={{
							...StyleSheet.absoluteFillObject,
							padding: 20,
						}}
						key="2"
						collapsable={false}
					>
						<View
							height="100%"
							style={{
								justifyContent: "flex-start",
								alignItems: "stretch",
								flex: 1,
							}}
						>
							<View
								style={{
									marginTop: 20,
									flexDirection: "row",
									justifyContent: "space-between",
								}}
								width="100%"
							>
								<H2 style={{ fontWeight: "600" }}>24/7</H2>
								<Switch
									trackColor={{ false: "#3e3e3e", true: "#c4c4c4" }}
									thumbColor={"#fff"}
									ios_backgroundColor="#3e3e3e"
									onValueChange={(newValue) => {
										setTfs(newValue);
									}}
									value={tfs}
								/>
							</View>
							<View
								width="100%"
								style={{
									height: 1,
									backgroundColor: "#656B82",
									marginVertical: 20,
								}}
							/>
							<AnimatedTextInput
								mode="time"
								onChangeText={(d, s) => {
									let p = s.split(":");
									setSchedule((prev) => {
										return {
											...prev,
											startHour: p[0] * 1,
											startMin: p[1] * 1,
										};
									});
								}}
								placeholder="Время открытия"
								valid={scheduleIsValid()}
								required
							/>
							<AnimatedTextInput
								mode="time"
								onChangeText={(d, s) => {
									let p = s.split(":");
									setSchedule((prev) => {
										return {
											...prev,
											endHour: p[0] * 1,
											endMin: p[1] * 1,
										};
									});
								}}
								placeholder="Время закрытия"
								valid={scheduleIsValid()}
								required
							/>
						</View>
						<Button
							title="Дальше"
							disabled={!scheduleIsValid()}
							onPress={() => {
								setIsLoading(true);
								fetch(api + `playground/hour-work/${playgroundData.id}`, {
									method: playgroundData.hourWork ? "PUT" : "POST",
									headers: {
										accept: "application/json",
										"Content-Type": "application/json",
										Authorization: `Bearer ${getToken()}`,
									},
									body: JSON.stringify(schedule),
								})
									.then(async (resp) => {
										if (resp && resp.status == 200) {
											let s = await resp.json();
											setPlaygroundData((prev) => {
												return {
													...prev,
													hourWork: s,
												};
											});
											setIndex(2);
											pager.current.setPage(2);
										} else {
											console.log(resp.status);
											console.log(await resp.text());
											smthWentWrong();
										}
									})
									.finally(() => {
										setIsLoading(false);
									});
							}}
						/>
					</View>

					<View
						style={{
							...StyleSheet.absoluteFillObject,
							padding: 20,
						}}
						key="3"
						collapsable={false}
					>
						<View
							height="100%"
							style={{
								justifyContent: "flex-start",
								alignItems: "stretch",
								flex: 1,
							}}
						></View>
					</View>
				</PagerView>
				<View
					style={{
						padding: 20,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<Indicator index={index} count={[0, 1, 2]} />
				</View>
			</View>
			<Loader
				loading={isLoading}
				cancellable={true}
				setIsLoading={setIsLoading}
			/>
		</>
	);
}
