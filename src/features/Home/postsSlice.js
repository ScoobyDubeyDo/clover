import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	getDocs,
	limit,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	startAfter,
	updateDoc,
	where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../firebase";

const initialState = {
	userPosts: [],
	otherPosts: [],
	otherUserPosts: [],
	explorePosts: {
		posts: [],
		lastVisible: null,
		isLoading: false,
	},
	savedPosts: [],
};

export const getAllposts = createAsyncThunk(
	"posts/getAllPosts",
	async ({ userId, following }) => {
		const userPosts = [];
		const otherPosts = [];
		let i = 0;
		while (true) {
			const q = query(
				collection(db, "posts"),
				orderBy("uploadDate", "desc"),
				where("userId", "in", [...following].slice(i, i + 10))
			);
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				otherPosts.push(doc.data());
			});
			if (querySnapshot.size === 10) i += 10;
			else break;
		}

		const q2 = query(
			collection(db, "posts"),
			orderBy("uploadDate", "desc"),
			where("userId", "==", userId)
		);
		const querySnapshot = await getDocs(q2);
		querySnapshot.forEach((doc) => {
			userPosts.push(doc.data());
		});

		return { userPosts, otherPosts };
	}
);

export const getSavedPosts = createAsyncThunk(
	"posts/getSavedPosts",
	async (savedIds) => {
		const q = query(
			collection(db, "posts"),
			where("uid", "in", [...savedIds])
		);
		const querySnapshot = await getDocs(q);
		const savedPosts = [];
		querySnapshot.forEach((doc) => {
			savedPosts.push(doc.data());
		});
		return { savedPosts };
	}
);

export const getSingleUserPosts = createAsyncThunk(
	"posts/getSingleUserPosts",
	async (userId) => {
		const q = query(collection(db, "posts"), where("userId", "==", userId));
		const querySnapshot = await getDocs(q);
		const posts = [];
		querySnapshot.forEach((doc) => {
			posts.push(doc.data());
		});
		return { posts };
	}
);

export const getExplorePosts = createAsyncThunk(
	"posts/getExplorePosts",
	async ({ firstBatch = false, nextBatch = false, lastVisible = null }) => {
		const firstPosts = [];
		const lastPosts = [];
		let last = null;
		if (firstBatch) {
			const first = query(
				collection(db, "posts"),
				orderBy("uploadDate", "desc"),
				limit(5)
			);
			const documentSnapshots = await getDocs(first);

			last = documentSnapshots.docs[documentSnapshots.docs.length - 1];

			documentSnapshots.forEach((doc) => {
				firstPosts.push(doc.data());
			});
		}
		if (nextBatch && !!lastVisible) {
			const next = query(
				collection(db, "posts"),
				orderBy("uploadDate", "desc"),
				startAfter(lastVisible),
				limit(5)
			);
			const documentSnapshots = await getDocs(next);
			last = documentSnapshots.docs[documentSnapshots.docs.length - 1];
			documentSnapshots.forEach((doc) => {
				lastPosts.push(doc.data());
			});
		}
		return { firstPosts, last, lastPosts };
	}
);

export const addPost = createAsyncThunk(
	"posts/addPost",
	async ({ postText, photoUrl, userId, uid }) => {
		const time = serverTimestamp();

		const postObj = {
			userId,
			postText,
			uid,
			likes: [],
			comments: [],
			uploadDate: time,
			photoUrl,
		};
		const postRef = doc(db, "posts", uid);
		await setDoc(postRef, {
			...postObj,
		});
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, {
			posts: arrayUnion(uid),
		});
		return { postObj };
	}
);

export const deletePost = createAsyncThunk(
	"posts/deletePost",
	async ({ postId, userId, hasPhoto = false }) => {
		await deleteDoc(doc(db, "posts", postId));
		const q = query(
			collection(db, "comments"),
			where("postId", "==", postId)
		);
		const querySnapshot = await getDocs(q);

		querySnapshot.forEach(async (doc) => {
			await deleteDoc(doc.ref);
		});

		const userDocs = await getDocs(collection(db, "users"));
		userDocs.forEach(async (doc) => {
			await updateDoc(doc.ref, {
				bookmarked: arrayRemove(postId),
			});
		});
		const userRef = doc(db, "users", userId);
		await updateDoc(userRef, {
			posts: arrayRemove(postId),
		});

		if (hasPhoto) {
			const postRef = ref(storage, `posts/${userId}/${postId}`);
			await deleteObject(postRef);
		}
		return { postId };
	}
);

export const likePost = createAsyncThunk(
	"posts/likePost",
	async ({ postId, currentUserId }) => {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			likes: arrayUnion(currentUserId),
		});
		return { postId, currentUserId };
	}
);

export const unLikePost = createAsyncThunk(
	"posts/unLikePost",
	async ({ postId, currentUserId }) => {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			likes: arrayRemove(currentUserId),
		});
		return { postId, currentUserId };
	}
);

export const editPost = createAsyncThunk(
	"posts/editPost",
	async ({ postId, postText }) => {
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			postText: postText,
		});
		return { postId, postText };
	}
);

export const addPostToSaved = createAsyncThunk(
	"posts/addPostToSaved",
	async ({ postId, currentUserId }) => {
		const currentUserRef = doc(db, "users", currentUserId);
		await updateDoc(currentUserRef, {
			bookmarked: arrayUnion(postId),
		});
		return { postId, currentUserId };
	}
);

export const removePostFromSaved = createAsyncThunk(
	"posts/removePostFromSaved",
	async ({ postId, currentUserId }) => {
		const currentUserRef = doc(db, "users", currentUserId);
		await updateDoc(currentUserRef, {
			bookmarked: arrayRemove(postId),
		});
		return { postId, currentUserId };
	}
);

export const addComment = createAsyncThunk(
	"posts/addComment",
	async ({ commentText, userId, postId }) => {
		const uploadDate = serverTimestamp();
		const uid = nanoid();
		const commentObj = {
			userId,
			commentText,
			uid,
			uploadDate,
			postId,
		};
		const commentRef = doc(db, "comments", uid);
		await setDoc(commentRef, {
			...commentObj,
		});
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			comments: arrayUnion(uid),
		});
		return { commentObj };
	}
);

export const deleteComment = createAsyncThunk(
	"posts/deleteComment",
	async ({ commentId, postId }) => {
		await deleteDoc(doc(db, "comments", commentId));
		const postRef = doc(db, "posts", postId);
		await updateDoc(postRef, {
			comments: arrayRemove(commentId),
		});
		return { postId, commentId };
	}
);

export const editComment = createAsyncThunk(
	"posts/editComment",
	async ({ commentId, commentText }) => {
		const commentRef = doc(db, "comments", commentId);
		await updateDoc(commentRef, {
			commentText: commentText,
		});
		return { commentId, commentText };
	}
);

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {},
	extraReducers: {
		[addPost.fulfilled]: (state, action) => {
			// state.userPosts = [action.payload.postObj, ...state.userPosts];
			// state.otherPosts = [action.payload.postObj, ...state.otherPosts];
			// state.explorePosts.posts = [
			// 	action.payload.postObj,
			// 	...state.explorePosts.posts,
			// ];
		},
		[getAllposts.fulfilled]: (state, action) => {
			state.otherPosts = action.payload.otherPosts;
			state.userPosts = action.payload.userPosts;
		},
		[getSingleUserPosts.fulfilled]: (state, action) => {
			state.otherUserPosts = action.payload.posts;
		},
		[getSavedPosts.fulfilled]: (state, action) => {
			state.savedPosts = action.payload.savedPosts;
		},
		[getExplorePosts.fulfilled]: (state, action) => {
			if (action.payload.firstPosts.length > 0) {
				state.explorePosts.posts = action.payload.firstPosts;
			}
			state.explorePosts.posts = [
				...state.explorePosts.posts,
				...action.payload.lastPosts,
			];
			state.explorePosts.isLoading = false;
			state.explorePosts.lastVisible = action.payload.last;
		},
		[getExplorePosts.pending]: (state) => {
			state.explorePosts.isLoading = true;
		},
		[deletePost.fulfilled]: (state, action) => {
			const filterFunc = (post) => post.uid !== action.payload.postId;
			state.userPosts = [...state.userPosts].filter(filterFunc);
			state.otherPosts = [...state.otherPosts].filter(filterFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].filter(
				filterFunc
			);
		},
		[editPost.fulfilled]: (state, action) => {
			const mapFunc = (post) =>
				post.uid === action.payload.postId
					? { ...post, postText: action.payload.postText }
					: post;
			state.userPosts = [...state.userPosts].map(mapFunc);
			state.otherPosts = [...state.otherPosts].map(mapFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].map(
				mapFunc
			);
			state.savedPosts = [...state.savedPosts].map(mapFunc);
		},
		[likePost.fulfilled]: (state, action) => {
			const mapFunc = (post) =>
				post.uid === action.payload.postId
					? {
							...post,
							likes: [
								...post.likes,
								action.payload.currentUserId,
							],
					  }
					: post;
			state.userPosts = [...state.userPosts].map(mapFunc);
			state.otherPosts = [...state.otherPosts].map(mapFunc);
			state.savedPosts = [...state.savedPosts].map(mapFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].map(
				mapFunc
			);
		},
		[addComment.fulfilled]: (state, action) => {
			const mapFunc = (post) =>
				post.uid === action.payload.commentObj.postId
					? {
							...post,
							comments: [
								...post.comments,
								action.payload.commentObj.uid,
							],
					  }
					: post;
			state.userPosts = [...state.userPosts].map(mapFunc);
			state.otherPosts = [...state.otherPosts].map(mapFunc);
			state.savedPosts = [...state.savedPosts].map(mapFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].map(
				mapFunc
			);
		},
		[deleteComment.fulfilled]: (state, action) => {
			const mapFunc = (post) =>
				post.uid === action.payload.postId
					? {
							...post,
							comments: [...post.comments].filter(
								(uid) => uid !== action.payload.commentId
							),
					  }
					: post;
			state.userPosts = [...state.userPosts].map(mapFunc);
			state.otherPosts = [...state.otherPosts].map(mapFunc);
			state.savedPosts = [...state.savedPosts].map(mapFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].map(
				mapFunc
			);
		},
		[unLikePost.fulfilled]: (state, action) => {
			const mapFunc = (post) =>
				post.uid === action.payload.postId
					? {
							...post,
							likes: post.likes.filter(
								(id) => id !== action.payload.currentUserId
							),
					  }
					: post;
			state.userPosts = [...state.userPosts].map(mapFunc);
			state.otherPosts = [...state.otherPosts].map(mapFunc);
			state.savedPosts = [...state.savedPosts].map(mapFunc);
			state.explorePosts.posts = [...state.explorePosts.posts].map(
				mapFunc
			);
		},
		[removePostFromSaved.fulfilled]: (state, action) => {
			state.savedPosts = [...state.savedPosts].filter(
				(id) => id.uid !== action.payload.postId
			);
		},
	},
});

export const selectCurrentUserPosts = (state) => state.posts.userPosts;
export const selectOtherUserPosts = (state) => state.posts.otherUserPosts;
export const selectAllPosts = (state) => state.posts.otherPosts;
export const selectSavedPosts = (state) => state.posts.savedPosts;
export const selectExplorePosts = (state) => state.posts.explorePosts;

export default postsSlice.reducer;
