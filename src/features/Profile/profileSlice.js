import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
	data: {
		email: "",
		uid: "",
		avatarUrl: "",
		username: "",
		fullName: "",
		bio: "",
		bannerUrl: "",
		posts: [],
		followers: [],
		following: [],
		bookmarked: [],
		website: "",
	},
	isLoading: false,
};

export const getCurrentUserDetails = createAsyncThunk(
	"profile/getCurrentUserDetails",
	async (id) => {
		const userDoc = await getDoc(doc(collection(db, "users"), id));
		return userDoc.data();
	}
);

const profileSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		setProfileData: (state, action) => {
			state.data = { ...state.data, ...action.payload };
		},
		removeProfileData: (state) => {
			state.data = initialState.data;
		},
		setProfileLoading: (state, action) => {
			state.isLoading = action.payload;
		},
	},
	extraReducers: {
		[getCurrentUserDetails.fulfilled]: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { setProfileData, removeProfileData, setProfileLoading } =
	profileSlice.actions;
export const selectProfileData = (state) => state.profile.data;
export const selectProfileLoading = (state) => state.profile.isLoading;
export default profileSlice.reducer;
