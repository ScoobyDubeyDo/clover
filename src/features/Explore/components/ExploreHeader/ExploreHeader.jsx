import { useSelector } from "react-redux";
import { Group, MediaQuery, TextInput } from "@mantine/core";
import { selectAllUsers, selectProfileData } from "../../../../app/slices";
import { useIcons } from "../../../../hooks";
import { UserCard } from "./components";

export const ExploreHeader = () => {
	const getIcon = useIcons();
	const allUsers = useSelector(selectAllUsers);
	const { uid: userId } = useSelector(selectProfileData);
	return (
		<>
			<MediaQuery largerThan="xs" styles={{ display: "none" }}>
				<TextInput
					sx={{
						maxWidth: "100%",
					}}
					radius="xl"
					placeholder="Search"
					type="search"
					icon={getIcon("search", 20)}
				/>
			</MediaQuery>
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
