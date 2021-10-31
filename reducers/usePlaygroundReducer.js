export const usePlaygroundReducer = (prevState, action) => {
	switch (action.type) {
		case "load":
			return {
				...prevState,
				usePlaygrounds: action.usePlaygrounds,
			};
	}
};

export const initialUsePlaygroundState = {
	usePlaygrounds: [],
};
