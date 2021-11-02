export const usePlaygroundReducer = (prevState, action) => {
	switch (action.type) {
		case "load":
			return {
				...prevState,
				usePlaygrounds: action.usePlaygrounds,
			};
		case "delete":
			return {
				...prevState,
				usePlaygrounds: prevState.usePlaygrounds.filter((e) => {
					return e.id != action.id;
				}),
			};
	}
};

export const initialUsePlaygroundState = {
	usePlaygrounds: [],
};
