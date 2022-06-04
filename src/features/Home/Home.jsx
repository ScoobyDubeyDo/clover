import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Center, Stack, Text, Title } from "@mantine/core";
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
					m="auto"
					py="2rem"
					sx={{
						height: "40vh",
						flexDirection: "column",
						alignItems: "flex-start",
						maxWidth: "28rem",
					}}>
					<Title mb="xs" order={1}>
						Welcome to Clover!
					</Title>
					<Text mb="xl" color="dimmed">
						This is the best place to see what’s happening in your
						world. Find some people and follow them now.
					</Text>
					<Button component={Link} to="/explore">
						Let's Explore
					</Button>
				</Center>
			)}
		</Stack>
	);
};
