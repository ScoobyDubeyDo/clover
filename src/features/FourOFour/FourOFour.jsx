import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Center, Text } from "@mantine/core";
import lottie from "lottie-web";
import { useThemeBreakpoint } from "../../hooks";
import notFound from "./page404.json";

export const FourOFour = () => {
	const notFoundRef = useRef();

	useEffect(() => {
		lottie.loadAnimation({
			container: notFoundRef.current,
			animationData: notFound,
			loop: true,
			autoplay: true,
			renderer: "svg",
			rendererSettings: {
				preserveAspectRatio: "xMinYMin slice",
			},
		});
	}, []);

	const matches = useThemeBreakpoint("md");

	return (
		<Center
			sx={{
				gap: "1rem",
				height: "100vh",
				flexDirection: matches ? "row" : "column",
			}}>
			<Center
				sx={{
					maxHeight: "35rem",
					maxWidth: "35rem",
				}}
				ref={notFoundRef}></Center>
			<Box
				p="xl"
				sx={{
					maxWidth: "55ch",
				}}>
				<Text size="xl">
					Hmm...this page doesn’t exist. Try searching for someone
					else, or try exploring posts
				</Text>
				<Button
					mt="xl"
					component={Link}
					to="/explore"
					size="lg"
					compact>
					Go explore
				</Button>
			</Box>
		</Center>
	);
};
