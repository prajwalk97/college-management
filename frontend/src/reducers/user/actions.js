const initialState = {
};
const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUserData = (data) => {
    return {
        type: UPDATE_USER_DATA,
        payload: {
            ...data
        }
    }
}
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER_DATA:
            const newState = {
                ...state,
                ...action.payload
            };
            return newState;
        default:
            return state;
    }
};

export const getUserData = (state) => {
    return state.user;
}