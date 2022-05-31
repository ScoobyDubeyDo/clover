import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Center, Stack, Title } from "@mantine/core";
import {
	getSingleUserPosts,
	selectCurrentUserPosts,
	selectOtherUserPosts,
	selectProfileData, // selectSingleUserData,
} from "../../app/slices";
import { PostCard } from "../components";
import { UserProfileInfo } from "./components";

export const Profile = () => {
	const userPosts = useSelector(selectCurrentUserPosts);
	const { uid } = useSelector(selectProfileData);
	const singleUserPosts = useSelector(selectOtherUserPosts);
	const dispatch = useDispatch();
	const { userId } = useParams();
	const isCurrentUser = userId === uid;

	const posts = isCurrentUser ? userPosts : singleUserPosts;

	useEffect(() => {
		if (!isCurrentUser) dispatch(getSingleUserPosts(userId));
	}, [userId, dispatch, isCurrentUser]);

	return (
		<UserProfileInfo>
			<Stack>
				{posts?.length > 0 ? (
					[...posts]?.map((post) => {
						return <PostCard key={post.uid} post={post} />;
					})
				) : (
					<Center
						sx={{
							height: "40vh",
							border: "1px dashed gray",
						}}>
						<Title order={2}>{`${
							isCurrentUser ? "You haven't" : "The user hasn't"
						}  posted yet`}</Title>
					</Center>
				)}
			</Stack>
		</UserProfileInfo>
	);
};
