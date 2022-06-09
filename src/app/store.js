import { configureStore } from "@reduxjs/toolkit";
import { postsReducer, profileReducer, usersReducer } from "./slices";

export const store = configureStore({
	reducer: {
		profile: profileReducer,
		users: usersReducer,
		posts: postsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});
