import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center, Loader, Stack, Title } from "@mantine/core";
import { getExplorePosts, selectExplorePosts } from "../../app/slices";
import { useIntersectionObserver } from "../../hooks";
import { PostCard } from "../components";
import { ExploreHeader } from "./components/ExploreHeader/ExploreHeader";

export const Explore = () => {
	const dispatch = useDispatch();
	const lastElementRef = useRef(null);
	const { posts, lastVisible, isLoading } = useSelector(selectExplorePosts);
	const isOnScreen = useIntersectionObserver(
		lastElementRef,
		posts?.length > 0
	);

	useEffect(() => {
		dispatch(getExplorePosts({ firstBatch: true }));
	}, [dispatch]);

	useEffect(() => {
		if (isOnScreen && !!lastVisible) {
			dispatch(getExplorePosts({ nextBatch: isOnScreen, lastVisible }));
		}
	}, [dispatch, isOnScreen, lastVisible]);

	return (
		<>
			<ExploreHeader />
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
				{isLoading && <Loader size="xl" m="auto" />}
				{posts?.length > 0 && <div ref={lastElementRef} />}
			</Stack>
		</>
	);
};
