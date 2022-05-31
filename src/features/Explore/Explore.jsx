import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center, Stack, Title } from "@mantine/core";
import { getExplorePosts, selectExplorePosts } from "../../app/slices";
import { useIntersectionObserver } from "../../hooks";
import { PostCard } from "../components";
import { ExploreHeader } from "./components";

export const Explore = () => {
	const [lastPost, setLastPost] = useState(null);
	const onScreen = useIntersectionObserver(
		{ current: lastPost },
		{ threshold: 1 }
	);
	const { posts, lastVisible } = useSelector(selectExplorePosts);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getExplorePosts({ firstBatch: true }));
	}, [dispatch]);

	useEffect(() => {
		if (onScreen) {
			dispatch(getExplorePosts({ nextBatch: onScreen, lastVisible }));
		}
	}, [dispatch, onScreen, lastVisible]);

	console.log({ onScreen });

	return (
		<>
			<ExploreHeader />
			<Stack>
				{posts?.length > 0 ? (
					posts.map((post, i) => {
						return i === posts.length - 1 ? (
							<div key={post.uid} ref={setLastPost}>
								<PostCard
									// key={post.uid}
									post={post}
								/>
							</div>
						) : (
							<PostCard key={post.uid} post={post} />
						);
					})
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
		</>
	);
};
