import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Center, Loader, Stack, Title } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { getExplorePosts, selectExplorePosts } from "../../app/slices";
import { PostCard } from "../components";
import { ExploreHeader } from "./components/ExploreHeader/ExploreHeader";

export const Explore = () => {
	const dispatch = useDispatch();
	const { posts, lastVisible, isLoading } = useSelector(selectExplorePosts);
	const [ref, observedEntry] = useIntersection({
		threshold: 1,
	});
	const isOnScreen = observedEntry?.isIntersecting;

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
				{posts?.length > 0 && (
					<Box
						sx={{ minHeight: !!lastVisible ? "4rem" : "unset" }}
						ref={ref}
					/>
				)}
			</Stack>
		</>
	);
};
