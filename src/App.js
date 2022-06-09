import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {
	getAllUsers,
	getAllposts,
	getCurrentUserDetails,
	selectProfileData,
} from "./app/slices";
import { PrivateRoute } from "./components";
import { AppWrapper } from "./components/AppWrapper/AppWrapper";
import {
	Explore,
	Home,
	Profile,
	Saved,
	Signin,
	Signup,
	SinglePost,
} from "./features";
import { auth } from "./firebase";

function App() {
	const currentUser = useSelector(selectProfileData);
	const dispatch = useDispatch();
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			localStorage.setItem("myToken", user?.accessToken);
			dispatch(getCurrentUserDetails(user?.uid));
			dispatch(getAllUsers(user?.uid));
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	useEffect(() => {
		if (!!currentUser.uid) {
			dispatch(
				getAllposts({
					userId: currentUser.uid,
					following: currentUser.following,
				})
			);
		}
	}, [currentUser, dispatch]);

	return (
		<Routes>
			<Route element={<PrivateRoute switchPath={false} />}>
				<Route path="sign-up" element={<Signup />} />
				<Route path="sign-in" element={<Signin />} />
			</Route>
			<Route element={<PrivateRoute />}>
				<Route element={<AppWrapper />}>
					<Route path="/" element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/saved" element={<Saved />} />
					<Route path="/profile/:userId" element={<Profile />} />
					<Route path="/singlepost" element={<SinglePost />} />
				</Route>
			</Route>
			<Route path="*" element={<>asasass</>} />
		</Routes>
	);
}

export default App;
