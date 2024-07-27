const initialState = {
    email: '',
    name: ''
};
const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export const updateUserData = (email, name) => {
    return {
        type: UPDATE_USER_DATA,
        payload: {
            email,
            name
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