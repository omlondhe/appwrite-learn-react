const loginReducer = (state, action) => {
	state.status = true;
	state.userData = action.payload.userData;
};

const logoutReducer = (state) => {
	state.status = false;
	state.userData = null;
};

export const authReducers = {
	login: loginReducer,
	logout: logoutReducer,
};
