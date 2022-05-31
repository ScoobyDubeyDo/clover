import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center, Stack, Title } from "@mantine/core";
import {
	getSavedPosts,
	selectProfileData,
	selectSavedPosts,
} from "../../app/slices";
import { PostCard } from "../components";

export const Saved = () => {
	const posts = useSelector(selectSavedPosts);
	const { bookmarked } = useSelector(selectProfileData);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getSavedPosts(bookmarked));
	}, [bookmarked, dispatch]);

	return (
		<Stack>
			{posts?.length > 0 ? (
				posts.map((post) => <PostCard key={post.uid} post={post} />)
			) : (
				<Center
					sx={{
						height: "40vh",
						border: "1px dashed gray",
					}}>
					<Title order={2}>Nothing to show</Title>
				</Center>
			)}
		</Stack>
	);
};
