import React, {
	useRef,
	useState,
	createRef,
	useEffect,
	useCallback,
	useContext,
} from "react";
import globalStyles from "../global/Styles";
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	StatusBar,
	BackHandler,
	Platform,
	ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toolbar from "../components/Toolbar";
import Searchbar from "../components/Searchbar";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import Maps from "../components/Maps";
import FloatingPanel from "../components/FloatingPanel";
import PlaygroundInfo from "../components/PlaygroundInfo";
import Loader from "../components/Loader";
import * as Location from "expo-location";
import checkIfLocationEnabled from "../global/checkIfLocationEnabled";
import checkLocationPermission from "../global/checkLocationPermission";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import api from "../global/api";
import AuthContext from "../contexts/AuthContext";
import searchPlaygrounds from "../api/searchPlaygrounds";

export default function UsePlaygroundChoiceScreen({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(null);
	const [showList, setShowList] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [title, setTitle] = useState("");
	const [playgrounds, setPlaygrounds] = useState([]);
	const [coords, setCoords] = useState(null);
	const [address, setAddress] = useState("");
	const [addressObj, setAddressObj] = useState({});
	// const [isNewGame, setIsNewGame] = useState(route.params.isNewGame);
	const [isNewGame, setIsNewGame] = useState(true);

	const [gameData, setGameData] = useState(route.params.gameData);
	const [selectedUsePlayground, setSelectedUsePlayground] = useState({
		playground: {},
	});
	const ref = useRef(null);
	const map = useRef(null);

	console.log(isNewGame)

	const { getToken } = useContext(AuthContext);

	useEffect(() => {
		if(selectedUsePlayground.playground !== {}) {
			console.log('a' + selectedUsePlayground.playground.latitude)
			map.current.animateCamera(
				{
					center: {
						latitude: selectedUsePlayground.playground.latitude,
						longitude: selectedUsePlayground.playground.longtitude,
					},
					zoom: 15,
				},
				1000
			);
		}
	}, [selectedUsePlayground]);

	const onBack = () => {
		if (showList) {
			setShowList(false);
			return true;
		} else if (showInfo) {
			setShowInfo(false);
			setShowList(true);
			return true;
		} else {
			return false;
		}
	};

	useFocusEffect(
		useCallback(() => {
			const onBackPress = onBack;

			BackHandler.addEventListener("hardwareBackPress", onBackPress);

			return () =>
				BackHandler.removeEventListener("hardwareBackPress", onBackPress);
		}, [showList, setShowList])
	);

	useEffect(() => {
		if (showList) {
			setTitle("Список игр");
		} else if (showInfo) {
			setTitle("Информация об игре");
		} else {
			setTitle("Выберите игру");
		}
	}, [showList, showInfo]);

	useEffect(() => {
		if (!address) {
			let a = addressObj
				? addressObj.district ??
				  addressObj.city ??
				  addressObj.subregion ??
				  addressObj.region ??
				  addressObj.name
				: "";
			a = `${a ?? ""}`.trim();
			setAddress(a);
		}
	}, [addressObj]);

	function init() {
		checkIfLocationEnabled().then((enabled) => {
			if (enabled) {
				setIsLoading(true);
				checkLocationPermission().then((granted) => {
					if (granted) {
						Location.getCurrentPositionAsync({
							accuracy: Location.LocationAccuracy.Highest,
						})
							.then((location) => {
								if (location && location.coords) {
									setCoords(location.coords);
									if (map.current.animateCamera) {
										map.current.animateCamera(
											{
												center: {
													latitude: location.coords.latitude,
													longitude: location.coords.longitude,
												},
												pitch: 12,
												heading: 20,
												altitude: 200,
												zoom: 14,
											},
											{ duration: 1000 }
										);
									}
									Location.reverseGeocodeAsync({
										latitude: location.coords.latitude,
										longitude: location.coords.longitude,
									}).then((address) => {
										setIsLoading(false);
										setAddressObj(address[0]);
									});
								}
							})
							.catch((reason) => {
								if (!coords) {
									init();
								}
							});
					} else {
						navigation.pop();
					}
				});
			} else {
				navigation.pop();
			}
		});
	}

	function joinToGame() {
		setIsLoading(true);
		fetch(api + "use-playground/game-choice", {
			method: "POST",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
			body: {
				usePlaygroundId: selectedUsePlayground.id,
			},
		})
			.then(async (response) => {
				console.log(await response.json());
				if (response.status == 200) {
				}
			})
			.catch((reason) => {})
			.finally(() => {
				setIsLoading(false);
			});
	}

	useEffect(() => {
		if (!coords || !address) {
			init();
		}
	}, []);

	return (
		<>
			<Toolbar back title={title} onMenu={() => {}} onBack={onBack} />
			{!showInfo && (
				<>
					<View style={styles.container}>
						<View style={styles.searchbarContainer}>
							<Searchbar
								ref={ref}
								value={address}
								onFocus={() => {
									setShowList(false);
								}}
								onChangeText={(newValue) => {
									setAddress(newValue);
								}}
								onSubmit={(text) => {
									console.log(text)
									setIsLoading(true);
									if (isNewGame) {
										searchPlaygrounds({
											typeId: gameData.typeId,
											address: text,
											pay: gameData.pay,
											token: getToken(),
										})
											.then(async (response) => {
												setPlaygrounds([])
												let json = await response.json();
												await json.map(item => {
													item.playground.address.includes(text) ?
													setPlaygrounds([...playgrounds, item]) : null;
													item.playground.address.includes(text) ?
													console.log(item.playground.address) : null
												})
												map.current.animateCamera(
													{
														center: {
															latitude: json[0].playground.latitude ?? json[0].playground.latitude,
															longitude:
																json[0].playground.longitude ?? json[0].playground.longitude,
														},
														pitch: 12,
														heading: 20,
														altitude: 200,
														zoom: 14,
													},
													{ duration: 1000 }
												);
											})
											.catch((reason) => {
												console.log("reason -", reason);
											})
											.finally(() => {
												setIsLoading(false);
											});
									}
								}}
							/>
						</View>
					</View>

					<View style={styles.buttonsContainer} width="100%">
						<View style={{ ...styles.button, flex: 1, marginRight: 0 }}>
							<Button
								title={
									isLoading
										? "Загрузка..."
										: playgrounds.length === 0
										? "Список пуст"
										: "Список"
								}
								onPress={() => {
									setShowList(true);
									ref.current.blur();
								}}
								disabled={playgrounds.length === 0}
							/>
						</View>
						<View style={styles.button}>
							<IconButton
								onPress={() => {
									navigation.push("AddPlayground", {
										gameData: gameData
									});
								}}
							>
								<Image source={require("../assets/icons/add_location.png")} />
							</IconButton>
						</View>
					</View>
				</>
			)}
			<ScrollView
				style={{
					zIndex: 500,
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height,
					position: "absolute",
					top: StatusBar.currentHeight,
				}}
			>
				<MapView
					provider={PROVIDER_GOOGLE}
					style={{
						zIndex: 500,
						width: Dimensions.get("window").width,
						height: Dimensions.get("window").height,
					}}
					ref={map}
					showsMyLocationButton={true}
					showsUserLocation={true}
					initialCamera={{
						center: {
							latitude: 55.751244,
							longitude: 37.618423,
						},
						pitch: 12,
						heading: 20,
						altitude: 200,
						zoom: 14,
					}}
				>
					{playgrounds &&
						playgrounds.length > 0 &&
						playgrounds.map((item, index) => {
							return (
								<Marker
									coordinate={{
										latitude: item.playground.latitude,
										longitude: item.playground.longtitude ?? item.playground.longtitude,
									}}
									key={item.id.toString() + "_marker"}
									anchor={{ x: 0.5, y: 0.5 }}
									onPress={() => {
										setSelectedUsePlayground(item);
										setShowInfo(true);
									}}
									title={item.playground.name}
								>
									<View
										style={{ justifyContent: "center", alignItems: "center" }}
									>
										<Image
											source={require("../assets/images/marker.png")}
											style={{ width: 20, height: 20 }}
										/>
									</View>
								</Marker>
							);
						})}
					{playgrounds &&
						playgrounds.length > 0 &&
						playgrounds.map((item, index) => {
							return (
								<View key={item.id.toString() + "_circles"}>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude: item.playground.longtitude ?? item.playground.longtitude,
										}}
										radius={50}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude: item.playground.longtitude ?? item.playground.longtitude,
										}}
										radius={100}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude: item.playground.longtitude ?? item.playground.longtitude,
										}}
										radius={150}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
								</View>
							);
						})}
				</MapView>
			</ScrollView>
			{showList && (
				<View
					width="100%"
					height="100%"
					style={{ position: "absolute", zIndex: 750 }}
				/>
			)}
			<FloatingPanel
				show={showList}
				showInfo={setShowInfo}
				coords={coords}
				items={playgrounds}
				hideCallback={setShowList}
				onItemPressed={(data) => {
					console.log(data);
					setSelectedUsePlayground(data);
				}}
			/>
			<PlaygroundInfo
				coords={coords}
				show={showInfo}
				data={selectedUsePlayground}
				hideCallback={setShowInfo}
				setShowList={setShowList}
				joinToGame={joinToGame}
			/>
			<Loader
				loading={isLoading}
				cancellable={true}
				setIsLoading={(value) => {
					setIsLoading(value);
					if (!value) {
						navigation.pop();
					}
				}}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		zIndex: 1000,
	},
	searchbarContainer: {
		backgroundColor: "#0E0938",
		padding: 20,
	},
	buttonsContainer: {
		zIndex: 1000,
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		bottom: Platform.OS == "ios" ? 40 : 20,
	},
	button: {
		margin: 20,
	},
});
