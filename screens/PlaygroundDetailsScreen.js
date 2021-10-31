import React, { useState, useEffect, useCallback, useRef } from "react";
import {
	View,
	StyleSheet,
	Dimensions,
	BackHandler,
	Linking,
	Platform,
	SafeAreaView,
	Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Toolbar from "../components/Toolbar";
import Button from "../components/Button";
import IconButton from "../components/IconButton";
import Maps from "../components/Maps";
import PlaygroundInfo from "../components/PlaygroundInfo";
import SvgUri from "expo-svg-uri";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import checkIfLocationEnabled from "../global/checkIfLocationEnabled";
import checkLocationPermission from "../global/checkLocationPermission";
import Loader from "../components/Loader";
import * as Location from "expo-location";

export default function PlaygroundDetailsScreen({ navigation, route }) {
	const [isLoading, setIsLoading] = useState(null);
	const [showInfo, setShowInfo] = useState(false);
	const [title, setTitle] = useState("");
	const playground = route.params.playground;
	const map = useRef(null);
	const [coords, setCoords] = useState();
	const [location, setLocation] = useState(null);

	useFocusEffect(
		useCallback(() => {
			const onBackPress = () => {
				if (showInfo) {
					setShowInfo(false);
					return true;
				} else {
					return false;
				}
			};

			BackHandler.addEventListener("hardwareBackPress", onBackPress);

			return () =>
				BackHandler.removeEventListener("hardwareBackPress", onBackPress);
		}, [showInfo, setShowInfo])
	);

	useEffect(() => {
		if (showInfo) {
			setTitle("Информация о площадке");
		} else {
			setTitle("Площадка на карте");
		}
	}, [showInfo]);

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
								}
							})
							.finally(() => {
								setIsLoading(false);
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

	useEffect(() => {
		if (!coords) {
			init();
		}
	}, []);

	return (
		<>
			<Toolbar back title={title} onMenu={() => {}} />
			{!showInfo && (
				<>
					<View style={styles.container}></View>
					<SafeAreaView style={styles.buttonsContainer} width="100%">
						<View style={{ ...styles.button, flex: 1, marginRight: 0 }}>
							<Button
								title="Подробности"
								onPress={() => {
									setShowInfo(true);
								}}
							/>
						</View>
						<View style={styles.button}>
							<IconButton
								onPress={() => {
									let lat = playground.latitude;
									let lng = playground.longitude ?? playground.longtitude;
									const scheme = Platform.select({
										ios: "maps:0,0?q=",
										android: "geo:0,0?q=",
									});
									const latLng = `${lat},${lng}`;
									const label = "Открыть в картах";
									const url = Platform.select({
										ios: `${scheme}${label}@${latLng}`,
										android: `${scheme}${latLng}(${label})`,
									});

									Linking.openURL(url);
								}}
							>
								<SvgUri source={require("../assets/icons/map.svg")} />
							</IconButton>
						</View>
					</SafeAreaView>
				</>
			)}
			{playground ? (
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
							latitude: playground.latitude,
							longitude: playground.longitude ?? playground.longtitude,
						},
						pitch: 12,
						heading: 20,
						altitude: 200,
						zoom: 16,
					}}
				>
					<Marker
						coordinate={{
							latitude: playground.latitude,
							longitude: playground.longitude ?? playground.longtitude,
						}}
						key={playground.id.toString() + "_marker"}
						anchor={{ x: 0.5, y: 0.5 }}
						onPress={() => {
							setShowInfo(true);
						}}
					>
						<View style={{ justifyContent: "center", alignItems: "center" }}>
							<Image
								source={require("../assets/images/marker.png")}
								style={{ width: 20, height: 20 }}
							/>
						</View>
					</Marker>
					{[50, 100, 150].map((radius) => {
						return (
							<Circle
								key={`${playground.id.toString()}_circles_${radius}`}
								center={{
									latitude: playground.latitude,
									longitude: playground.longitude ?? playground.longtitude,
								}}
								radius={radius}
								fillColor="rgba(100,255,255,0.3)"
								strokeWidth={1}
								strokeColor="rgb(100,255,255)"
							/>
						);
					})}
				</MapView>
			) : null}
			{coords ? (
				<PlaygroundInfo
					show={showInfo}
					data={playground}
					coords={coords}
					hideCallback={setShowInfo}
				/>
			) : null}
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
