import React, { useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import User from "../models/User";

export default AuthContext = React.createContext();

export const authContext = (loginState, dispatchLoginState) =>
	useMemo(() => ({
		signIn: async (data) => {
			let response = await fetch(api + "login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(data),
			});
			console.log(response.status);
			if (response.ok) {
				let user = await response.json();
				if (user) {
					await AsyncStorage.setItem("user", JSON.stringify(user));
					dispatchLoginState({
						type: "login",
						user: new User(user),
					});
				} else {
					Alert.alert(
						"Упс...",
						"Не удалось войти. Проверьте правильность введенных данных и повторите попытку"
					);
					return true;
				}
			} else {
				Alert.alert(
					"Упс...",
					"Не удалось войти. Проверьте правильность введенных данных и повторите попытку"
				);
				return true;
			}
		},
		signOut: async () => {
			await AsyncStorage.removeItem("user");
			dispatchLoginState({ type: "logout" });
		},
		signUp: async (data) => {
			let response = await fetch(api + "registration", {
				method: "POST",
				headers: {
					"Content-Type": "application/json;charset=utf-8",
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				response = await fetch(api + "login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json;charset=utf-8",
					},
					body: JSON.stringify({
						username: data.username,
						password: data.password,
					}),
				});
				if (response.ok) {
					console.log(response.status);
					let user = await response.json();
					console.log(JSON.stringify(user));
					if (user) {
						await AsyncStorage.setItem("user", JSON.stringify(user));
						dispatchLoginState({
							type: "login",
							user: new User(user),
						});
					} else {
						Alert.alert(
							"Упс...",
							"Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку"
						);
						return true;
					}
				} else {
					Alert.alert(
						"Упс...",
						"Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку"
					);
					return true;
				}
			} else {
				Alert.alert(
					"Упс...",
					"Не удалось зарегистрироваться. Проверьте правильность введенных данных и повторите попытку"
				);
				return true;
			}
		},
		getUser: () => {
			return loginState.user;
		},
		getToken: () => {
			return loginState.user.access_token;
		},
		editAccount: async (data) => {
			let requestBody = JSON.stringify({
				username: data.username ?? "",
				email: data.email ?? "",
				phone: data.phone ?? "",
				birthday: data.birthday ?? "",
				address: data.address ?? "",
				gender: data.gender ?? 0,
				name: data.name ?? "",
				lastName: data.lastName ?? "",
			}).replace("null", '""');
			console.log("\n\n" + requestBody);
			let response = await fetch(api + "profile", {
				method: "PUT",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${data.access_token}`,
				},
				body: requestBody,
			});
			let user = await response.json();
			if (response.ok) {
				await AsyncStorage.setItem("user", JSON.stringify(user));
				dispatchLoginState({
					type: "edit",
					user: new User(user),
				});
			} else {
				console.log(JSON.stringify(user));
				Alert.alert(
					"Что-то пошло не так...",
					"Не удалось изменить аккаунт. Проверьте правильность введенных данных и повторите попытку",
					[{ text: "OK", onPress: () => {} }]
				);
				return true;
			}
		},
		getLoading: () => loginState.isLoading,
	}));
