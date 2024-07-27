const initialState = {
    jwt: '',
};
const UPDATE_JWT = "UPDATE_JWT";

export const updateJWT = (jwt) => {
    return {
        type: "UPDATE_JWT",
        payload: {
            jwt: jwt
        }
    }
}
export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_JWT:
            const newState = {
                ...state,
                jwt: action.payload?.jwt
            };
            return newState;
        default:
            return state;
    }
};

export const getJwt = (state) => {
    return state.auth.jwt;
}