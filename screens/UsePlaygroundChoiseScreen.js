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
	TouchableOpacity,
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
import searchUsePlaygrounds from "../api/searchUsePlaygrounds";
import UsePlaygroundContext from "../contexts/UsePlaygroundContext";
import distance from "../global/distance";
import H6 from "../components/H6";
import H2 from "../components/H2";
import H7 from "../components/H7";
import UsePlaygroundInfo from "../components/UsePlaygroundInfo";

export default function UsePlaygroundChoiceScreen({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(null);
	const [showList, setShowList] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [title, setTitle] = useState("");
	const [usePlaygrounds, setUsePlaygrounds] = useState([]);
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

	const { getToken } = useContext(AuthContext);
	const { load } = useContext(UsePlaygroundContext);

	useEffect(() => {
		map.current.animateCamera(
			{
				center: {
					latitude: selectedUsePlayground.playground.latitude,
					longitude: selectedUsePlayground.playground.longitude,
				},
				zoom: 15,
			},
			1000
		);
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
				console.log(response.status);
				console.log(await response.json());
				if (response.status == 200) {
					await load({ token: getToken() });
					const resetAction = StackActions.replace("Main", { screen: "Lobby" });
					navigation.dispatch(resetAction);
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
									console.log(text);
									setIsLoading(true);
									if (isNewGame) {
										searchUsePlaygrounds({
											typeId: gameData.typeId,
											address: text,
											pay: gameData.pay,
											token: getToken(),
										})
											.then(async (response) => {
												let json = await response.json();
												console.log(json);
												await json.map((item) => {
													item.playground.address.includes(text)
														? setUsePlaygrounds([...usePlaygrounds, item])
														: null;
													item.playground.address.includes(text)
														? console.log(item.playground.address)
														: null;
												});
												map.current.animateCamera(
													{
														center: {
															latitude:
																json[0].playground.latitude ??
																json[0].playground.latitude,
															longitude:
																json[0].playground.longitude ??
																json[0].playground.longitude,
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
						<View style={{ ...styles.button, flex: 1 }}>
							<Button
								title={
									isLoading
										? "Загрузка..."
										: usePlaygrounds.length === 0
										? "Список пуст"
										: "Список"
								}
								onPress={() => {
									setShowList(true);
									ref.current.blur();
								}}
								disabled={usePlaygrounds.length === 0}
							/>
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
					{usePlaygrounds &&
						usePlaygrounds.length > 0 &&
						usePlaygrounds.map((item, index) => {
							return (
								<Marker
									coordinate={{
										latitude: item.playground.latitude,
										longitude:
											item.playground.longtitude ?? item.playground.longtitude,
									}}
									key={item.id.toString() + "_marker"}
									anchor={{ x: 0.5, y: 0.5 }}
									onPress={() => {
										setSelectedUsePlayground(item);
										setShowInfo(true);
									}}
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
					{usePlaygrounds &&
						usePlaygrounds.length > 0 &&
						usePlaygrounds.map((item, index) => {
							return (
								<View key={item.id.toString() + "_circles"}>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude:
												item.playground.longtitude ??
												item.playground.longtitude,
										}}
										radius={50}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude:
												item.playground.longtitude ??
												item.playground.longtitude,
										}}
										radius={100}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
									<Circle
										center={{
											latitude: item.playground.latitude,
											longitude:
												item.playground.longtitude ??
												item.playground.longtitude,
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
				items={usePlaygrounds}
				hideCallback={setShowList}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={styles.listItem}
							activeOpacity={0.5}
							onPress={() => {
								setShowList(false);
								setShowInfo(true);
								setSelectedUsePlayground(item);
							}}
						>
							<H2 color="#000">
								{item.playground.name.charAt(0).toUpperCase() +
									item.playground.name.slice(1)}
							</H2>
							<View style={{ ...globalStyles.row, alignItems: "flex-end" }}>
								<View
									style={{
										flex: 1,
										justifyContent: "space-evenly",
									}}
								>
									<H7 color="#999">{item.playground.address}</H7>
								</View>
								<H6 color="#6565FC">
									{distance(
										item.playground.latitude,
										coords.latitude,
										item.playground.longitude ?? item.playground.longtitude,
										coords.longitude
									)}
								</H6>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			<UsePlaygroundInfo
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
	listItem: {
		maxHeight: 150,
		paddingHorizontal: 10,
		paddingVertical: 10,
		marginHorizontal: 5,
		justifyContent: "space-evenly",
	},
});
