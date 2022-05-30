import { useSelector } from "react-redux";
import { Center, Stack, Title } from "@mantine/core";
import { selectAllPosts } from "../../app/slices";
import { PostCard } from "../components";

export const Home = () => {
	const allPosts = useSelector(selectAllPosts);
	return (
		<Stack>
			{allPosts?.length > 0 ? (
				[...allPosts].map((post) => (
					<PostCard key={post.uid} post={post} />
				))
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
