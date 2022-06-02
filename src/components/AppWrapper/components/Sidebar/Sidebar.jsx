import { useSelector } from "react-redux";
import { Aside, MediaQuery, Paper, ScrollArea, Title } from "@mantine/core";
import { selectAllUsers, selectProfileData } from "../../../../app/slices";
import { UserChip } from "./components";

export const Sidebar = () => {
	const allUsers = useSelector(selectAllUsers);
	const { uid: userId } = useSelector(selectProfileData);

	const notFollowingUsers = [...allUsers].filter(
		({ followers }) => !followers.includes(userId)
	);

	return (
		<MediaQuery smallerThan="md" styles={{ display: "none" }}>
			<Aside
				p="md"
				hiddenBreakpoint="md"
				width={{ md: 250, lg: 350, xl: 400 }}>
				{!!notFollowingUsers.length && (
					<Paper sx={{ maxHeight: 334.5, maxWidth: 300 }}>
						<Title m="sm" order={3}>
							Who to follow
						</Title>
						<ScrollArea
							sx={{ height: "calc(100% - 55px)" }}
							offsetScrollbars>
							{notFollowingUsers
								.map(
									({
										uid,
										fullName,
										avatarUrl,
										username,
									}) => {
										return (
											<UserChip
												key={uid}
												uid={uid}
												name={fullName}
												username={username}
												photoURL={avatarUrl}
											/>
										);
									}
								)
								.slice(0, 6)}
						</ScrollArea>
					</Paper>
				)}
			</Aside>
		</MediaQuery>
	);
};
