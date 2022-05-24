import { useSelector } from "react-redux";
import { Aside, MediaQuery, Paper, ScrollArea, Title } from "@mantine/core";
import { selectAllUsers, selectProfileData } from "../../../../app/slices";
import { UserChip } from "./components";

export const Sidebar = () => {
	const allUsers = useSelector(selectAllUsers);
	const { uid: userId } = useSelector(selectProfileData);
	return (
		<MediaQuery smallerThan="md" styles={{ display: "none" }}>
			<Aside
				p="md"
				hiddenBreakpoint="md"
				width={{ md: 250, lg: 350, xl: 400 }}>
				<Paper sx={{ maxHeight: 334.5, maxWidth: 300 }}>
					<Title m="sm" order={3}>
						Who to follow
					</Title>
					<ScrollArea
						sx={{ height: "calc(100% - 55px)" }}
						offsetScrollbars>
						{allUsers.map(
							({
								uid,
								fullName,
								avatarUrl,
								username,
								followers = [],
							}) => {
								if (!followers.includes(userId)) {
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
							}
						)}
					</ScrollArea>
				</Paper>
			</Aside>
		</MediaQuery>
	);
};
