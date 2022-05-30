import { configureStore } from "@reduxjs/toolkit";
import {
	authenticationReducer,
	postsReducer,
	profileReducer,
	usersReducer,
} from "./slices";

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		profile: profileReducer,
		users: usersReducer,
		posts: postsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
