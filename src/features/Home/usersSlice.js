import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

const initialState = {
	allUsers: [],
	singleUser: {
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
		error: "",
	},
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (id) => {
	arrayUnion;

	const querySnapshot = await getDocs(collection(db, "users"));
	const temp = [];
	querySnapshot.forEach((doc) => {
		if (doc.data().uid !== id) {
			temp.push(doc.data());
		}
	});
	return temp;
});

export const getSingleUser = createAsyncThunk(
	"users/getSingleUser",
	async (id) => {
		const userDoc = await getDoc(doc(collection(db, "users"), id));
		return userDoc.data();
	}
);

export const followUser = createAsyncThunk(
	"users/followUser",
	async ({ currentUserID, followedUserID }) => {
		const currentUserRef = doc(db, "users", currentUserID);
		await updateDoc(currentUserRef, {
			following: arrayUnion(followedUserID),
		});
		const followedUserDocs = doc(db, "users", followedUserID);
		await updateDoc(followedUserDocs, {
			followers: arrayUnion(currentUserID),
		});
		return { followedUserID, currentUserID };
	}
);

export const unFollowUser = createAsyncThunk(
	"users/unFollowUser",
	async ({ currentUserID, followedUserID }) => {
		const currentUserRef = doc(db, "users", currentUserID);
		await updateDoc(currentUserRef, {
			following: arrayRemove(followedUserID),
		});
		const followedUserDocs = doc(db, "users", followedUserID);
		await updateDoc(followedUserDocs, {
			followers: arrayRemove(currentUserID),
		});
		return { followedUserID, currentUserID };
	}
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: {
		[getAllUsers.fulfilled]: (state, action) => {
			state.allUsers = action.payload;
		},
		[getSingleUser.fulfilled]: (state, action) => {
			state.singleUser.data = action.payload;
		},
		[getSingleUser.rejected]: (state, action) => {
			state.singleUser.error = action.payload;
		},
		[followUser.fulfilled]: (state, action) => {
			state.allUsers = [...state.allUsers].map((user) => {
				return user.uid === action.payload.followedUserID
					? {
							...user,
							followers: [
								...user.followers,
								action.payload.currentUserID,
							],
					  }
					: user;
			});
		},
		[unFollowUser.fulfilled]: (state, action) => {
			state.allUsers = [...state.allUsers].map((user) => {
				return user.uid === action.payload.followedUserID
					? {
							...user,
							followers: [
								...user.followers.filter(
									(ele) =>
										ele !== action.payload.currentUserID
								),
							],
					  }
					: user;
			});
		},
	},
});

// export const {} = usersSlice.actions;
export const selectAllUsers = (state) => state.users.allUsers;
export const selectSingleUserData = (state) => state.users.singleUser.data;
export const selectSingleUserError = (state) => state.users.singleUser.error;
export default usersSlice.reducer;
