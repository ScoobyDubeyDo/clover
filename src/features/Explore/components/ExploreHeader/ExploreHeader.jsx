import { useSelector } from "react-redux";
import { Group, MediaQuery } from "@mantine/core";
import { selectAllUsers, selectProfileData } from "../../../../app/slices";
import { SearchInput } from "../../../../components";
import { useThemeBreakpoint } from "../../../../hooks";
import { UserCard } from "./components";

export const ExploreHeader = () => {
	const allUsers = useSelector(selectAllUsers);
	const { uid: userId } = useSelector(selectProfileData);
	const matches = useThemeBreakpoint("xs", true);
	return (
		<>
			{matches && <SearchInput />}
			<MediaQuery largerThan="md" styles={{ display: "none" }}>
				<Group
					my="xs"
					sx={{
						height: 230,
						overflow: "auto",
						maxWidth: "100%",
					}}>
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
									<UserCard
										key={uid}
										uid={uid}
										name={fullName}
										username={username}
										photoURL={avatarUrl}
									/>
								);
							}
							return null;
						}
					)}
				</Group>
			</MediaQuery>
		</>
	);
};
