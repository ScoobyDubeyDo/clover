import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, MediaQuery, Navbar as Nav, Stack } from "@mantine/core";
import { selectProfileData } from "../../../../app/slices";
import { useIcons } from "../../../../hooks/useIcons";
import { AddPostModal } from "../../../AddPostModal/AddPostModal";
import { Navlink } from "./components";

export const Navbar = () => {
	const postIcon = useIcons("post", 20);
	const { username, fullName, uid } = useSelector(selectProfileData);
	const [postModalOpen, setPostModalOpen] = useState(false);

	return (
		<>
			<MediaQuery smallerThan="xs" styles={{ display: "none" }}>
				<Nav
					sx={{
						"& > *": {
							width: "100%",
						},
					}}
					p="md"
					hiddenBreakpoint="xs"
					width={{ xs: 250, lg: 350, xl: 400 }}>
					<Nav.Section grow mt="md">
						<Stack
							sx={(theme) => ({
								width: "100%",
								m: "md",
								marginLeft: "auto",
								[`@media (min-width: ${theme.breakpoints.lg}px)`]:
									{
										width: 200,
									},
							})}
							spacing="md">
							<Navlink label="Home" />
							<Navlink label="explore" />
							<Navlink label="Saved" />
							<Navlink label="Profile" to={`profile/${uid}`} />
							<Button
								onClick={() => setPostModalOpen(true)}
								size="md"
								leftIcon={postIcon}
								fullWidth>
								Clove it
							</Button>
						</Stack>
					</Nav.Section>
					<Nav.Section
						mt="xs"
						sx={{
							marginLeft: "auto",
							width: "100%",
							maxWidth: 250,
						}}>
						<Navlink
							sx={{ marginLeft: "auto" }}
							username={username}
							label={fullName}
						/>
					</Nav.Section>
				</Nav>
			</MediaQuery>
			<AddPostModal opened={postModalOpen} setOpened={setPostModalOpen} />
		</>
	);
};
