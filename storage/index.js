import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialLoginState = {
	login: '',
};

const initialCopyrightsState = {
	copyrightsList: []
};

const loginSlice = createSlice({
	name: 'login',
	initialState: initialLoginState,
	reducers: {
		setLoginEmail: (state, action) => {
			state.login = action.payload;
		},
	},
});

export const { setLoginEmail } = loginSlice.actions;

const copyrightsListSlice = createSlice({
	name: 'copyrightsList',
	initialState: initialCopyrightsState,
	reducers: {
		setCopyrightsList: (state, action) => {
			const { copyrights } = action.payload;
			if (!state.copyrightsList.find(item => item === copyrights))
				state.copyrightsList = [...state.copyrightsList, copyrights];
		},
	}
});

export const { setCopyrightsList } = copyrightsListSlice.actions;

const store = configureStore({
	reducer: {
		login: loginSlice.reducer,
		copyrightsList: copyrightsListSlice.reducer,
	},
});

export default store;