import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
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
					m="auto"
					py="2rem"
					sx={{
						height: "40vh",
						flexDirection: "column",
						alignItems: "flex-start",
						maxWidth: "28rem",
					}}>
					<Title mb="xs" order={1}>
						Save Cloves for later
					</Title>
					<Text mb="xl" color="dimmed">
						Don’t let the good ones fly away! Save Cloves to easily
						find them again in the future.
					</Text>
					<Button component={Link} to="/explore">
						Go save some...
					</Button>
				</Center>
			)}
		</Stack>
	);
};
