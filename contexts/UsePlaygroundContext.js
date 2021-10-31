import React, { useMemo } from "react";
import api from "../global/api";
import getNull from "../global/getNull";

export default UsePlaygroundContext = React.createContext();

export const usePlaygroundContext = (
	usePlaygroundState,
	dispatchUsePlaygroundState
) =>
	useMemo(() => ({
		load: async (data) => {
			let response = await fetch(
				api + "use-playground/my?expand=user%2C%20playground",
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${data.token}`,
					},
				}
			).catch((reason) => {});
			console.log(response.status);
			if (response.status == 200) {
				responseObj = await response.json();
				console.log(responseObj);
			}
			dispatchUsePlaygroundState({
				type: "load",
				usePlaygrounds: responseObj,
			});
		},
		getUsePlaygrounds: () => {
			return usePlaygroundState.usePlaygrounds;
		},
		getHistory: () => {
			return usePlaygroundState.usePlaygrounds.filter((e) => {
				return (
					new Date() >
					new Date(
						`${e.dateGame}T${getNull(e.startHour)}:${getNull(
							e.startMin
						)}:00.000Z`
					)
				);
			});
		},
		getLobby: () => {
			return usePlaygroundState.usePlaygrounds
				.slice()
				.reverse()
				.find((e) => {
					return (
						new Date() <
						new Date(
							`${e.dateGame}T${getNull(e.startHour)}:${getNull(
								e.startMin
							)}:00.000Z`
						)
					);
				});
		},
	}));
