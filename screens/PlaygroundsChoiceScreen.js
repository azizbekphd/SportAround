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
import { StackActions, CommonActions } from "@react-navigation/routers";
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
import getAddressString from "../global/getAddressString";
import UsePlaygroundContext from "../contexts/UsePlaygroundContext";
import H2 from "../components/H2";
import H7 from "../components/H7";
import H6 from "../components/H6";
import distance from "../global/distance";

export default function PlaygroundChoiceScreen({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(null);
	const [showList, setShowList] = useState(false);
	const [showInfo, setShowInfo] = useState(false);
	const [title, setTitle] = useState("");
	const [playgrounds, setPlaygrounds] = useState([]);
	const [coords, setCoords] = useState(null);
	const [address, setAddress] = useState("");
	const [addressObj, setAddressObj] = useState({});
	const [isNewGame, setIsNewGame] = useState(route.params.isNewGame);
	const [gameData, setGameData] = useState(route.params.gameData);
	const [selectedPlayground, setSelectedPlayground] = useState({});
	const [location, setLocation] = useState(null);
	const ref = useRef(null);
	const map = useRef(null);

	const { getToken } = useContext(AuthContext);
	const { load, addUsePlayground } = useContext(UsePlaygroundContext);

	useEffect(() => {
		if (route.params?.playground) {
			setPlaygrounds((prev) => {
				return [...prev, route.params?.playground];
			});
		}
	}, [route.params?.playground]);

	useEffect(() => {
		map.current.animateCamera(
			{
				center: {
					latitude: selectedPlayground.latitude,
					longitude: selectedPlayground.longitude,
				},
				zoom: 15,
			},
			1000
		);
	}, [selectedPlayground]);

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
			setTitle("Список площадок");
		} else if (showInfo) {
			setTitle("Информация о площадке");
		} else {
			setTitle("Выберите площадку");
		}
	}, [showList, showInfo]);

	useEffect(() => {
		if (!address) {
			setAddress(getAddressString(addressObj));
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
							.then((_location) => {
								setLocation(_location);
								if (_location && _location.coords) {
									setCoords(_location.coords);
									if (map.current.animateCamera) {
										map.current.animateCamera(
											{
												center: {
													latitude: _location.coords.latitude,
													longitude: _location.coords.longitude,
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
										latitude: _location.coords.latitude,
										longitude: _location.coords.longitude,
									}).then((address) => {
										setIsLoading(false);
										setAddressObj(address[0]);
										search(getAddressString(address[0]));
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

	function bookPlayground() {
		setIsLoading(true);
		fetch(api + "use-playground/create", {
			method: "POST",
			headers: {
				accept: "application/json",
				Authorization: `Bearer ${getToken()}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				playgroundId: selectedPlayground.id,
				dateGame: gameData.dateGame,
				startHour: gameData.startHour,
				startMin: gameData.startMin,
				endHour: gameData.endHour,
				endMin: gameData.endMin,
			}),
		})
			.then(async (response) => {
				console.log("Use playground");
				console.log(response.status);
				if (response.status == 200) {
					addUsePlayground(await response.json());
					await load({ token: getToken() });
					const resetAction = StackActions.replace("Main", { screen: "Lobby" });
					navigation.dispatch(resetAction);
				}
			})
			.catch((reason) => {
				console.log(reason);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	const search = (text) => {
		setIsLoading(true);
		if (isNewGame) {
			searchPlaygrounds({
				typeId: gameData.typeId,
				address: text,
				pay: gameData.pay,
				token: getToken(),
			})
				.then(async (response) => {
					let json = await response.json();
					console.log(json);
					setPlaygrounds(json);
					map.current.animateCamera(
						{
							center: {
								latitude: json[0].latitude,
								longitude: json[0].longitude ?? json[0].longtitude,
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
	};

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
								onSubmit={search}
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
										typeId: gameData.typeId,
										location: location,
										address: getAddressString(addressObj),
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
										latitude: item.latitude,
										longitude: item.longitude ?? item.longtitude,
									}}
									key={item.id.toString() + "_marker"}
									anchor={{ x: 0.5, y: 0.5 }}
									onPress={() => {
										setSelectedPlayground(item);
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
					{playgrounds &&
						playgrounds.length > 0 &&
						[50, 100, 150].map((radius) => {
							return playgrounds.map((item, index) => {
								return (
									<Circle
										key={`${item.id.toString()}_circles_${radius}`}
										center={{
											latitude: item.latitude,
											longitude: item.longitude ?? item.longtitude,
										}}
										radius={radius}
										fillColor="rgba(100,255,255,0.3)"
										strokeWidth={1}
										strokeColor="rgb(100,255,255)"
									/>
								);
							});
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
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							style={styles.listItem}
							activeOpacity={0.5}
							onPress={() => {
								setShowList(false);
								setShowInfo(true);
								setSelectedPlayground(item);
							}}
						>
							<H2 color="#000">
								{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
							</H2>
							<View style={{ ...globalStyles.row, alignItems: "flex-end" }}>
								<View
									style={{
										flex: 1,
										justifyContent: "space-evenly",
									}}
								>
									<H7 color="#999">{item.address}</H7>
								</View>
								<H6 color="#6565FC">
									{distance(
										item.latitude,
										coords.latitude,
										item.longitude ?? item.longtitude,
										coords.longitude
									)}
								</H6>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
			<PlaygroundInfo
				coords={coords}
				show={showInfo}
				data={selectedPlayground}
				hideCallback={setShowInfo}
				setShowList={setShowList}
				usePlayground={bookPlayground}
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
