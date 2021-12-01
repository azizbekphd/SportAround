export const usePlaygroundReducer = (prevState, action) => {
	switch (action.type) {
		case "load":
			return {
				...prevState,
				usePlaygrounds: action.usePlaygrounds,
			};
		case "delete":
			console.log(
				prevState.usePlaygrounds.filter((e) => {
					return e.id != action.id;
				}).length
			);
			return {
				...prevState,
				usePlaygrounds: prevState.usePlaygrounds.filter((e) => {
					return e.id != action.id;
				}),
			};
		case "add":
			console.log(prevState.usePlaygrounds.length);
			return {
				...prevState,
				usePlaygrounds: [...prevState.usePlaygrounds, action.usePlayground],
			};
	}
};

export const initialUsePlaygroundState = {
	usePlaygrounds: [],
};
