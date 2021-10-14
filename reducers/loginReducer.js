export const loginReducer = (prevState, action) => {
    switch (action.type) {
        case 'retrieve_token':
            return {
                ...prevState,
                isLoading: false,
                user: action.user
            };
        case 'login':
            return {
                ...prevState,
                isLoading: false,
                user: action.user
            };
        case 'logout':
            return {
                ...prevState,
                isLoading: false,
                user: null,
            };
        case 'registration':
            return {
                ...prevState,
                isLoading: false,
                user: action.user
            };
        case 'edit':
            return {
                ...prevState,
                isLoading: false,
                user: action.user
            };
    }
}

export const initialLoginState = {
    isLoading: true,
    user: null,
}